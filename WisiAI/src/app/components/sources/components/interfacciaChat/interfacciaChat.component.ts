import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssistantService } from 'src/app/services/assistant.service';
import { Assistant } from 'src/app/models/assistant';
import { HttpClientModule } from '@angular/common/http';
import { GptService } from 'src/app/services/gpt.service';
import { interval, switchMap } from 'rxjs';
import { concatMap, startWith, takeWhile } from 'rxjs/operators';

interface Message {
  text: string;
  isUser: boolean;
}

@Component({
  selector: 'app-interfaccia-chat',
  standalone: true,
  templateUrl: './interfacciaChat.component.html',
  styleUrls: ['./interfacciaChat.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
})
export class InterfacciaChatComponent implements OnInit {

  messages: Message[] = [];
  userMessage: string = '';
  chatVisible: boolean = true;
  showLoadingDots = false;
  @Input() assistant: Assistant = {
    assistantName: '',
    assistantImage: '',
    assistantSubtitle: '',
    assistantBackgroundColor: '',
    assistantTextColor: '',
    messaggioIniziale: '',
    instructions: '',
    selectedModel: '',
    selectedTemperature: 0
  };
  isDataLoaded: boolean = false;
  threadId!: string;
  runId: string = '';

  @Input() assistantId: string = '';

  @ViewChild('messageContainer') messageContainer!: ElementRef;

  constructor(private assistantService: AssistantService, private cdr: ChangeDetectorRef, private elRef: ElementRef, private gptService: GptService) {}

  ngOnInit(): void {
    const assistantId = localStorage.getItem('selectedAssistantId')!;
    this.assistantService.getAssistantById(assistantId).subscribe(
      (response) => {
        this.assistant = response;
        this.isDataLoaded = true;
        console.log(this.assistant);
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Errore durante il recupero dei dati dell\'assistente:', error);
      }
    );

    // Gestione recupero thread
    const savedThreadId = localStorage.getItem('threadId');
    if (savedThreadId) {
      this.threadId = savedThreadId;
      this.loadInitialMessages(this.threadId);
      this.scrollToBottom();
    } else {
      this.startNewChat();
    }
    this.positionComponent();
  }

  changeChatVisibility() {
    this.chatVisible = !this.chatVisible;
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.positionComponent();
  }

  positionComponent() {
    const component = this.elRef.nativeElement;
    component.style.position = 'fixed';
    component.style.bottom = '0';
    component.style.right = '0';
    component.style.paddingRight = '20px';
    component.style.paddingBottom = '20px';
  }

  sendUserMessage() {
    if (this.userMessage.trim() !== '') {
      this.messages.push({ text: this.userMessage, isUser: true });
      this.showLoadingDots = true;
      this.sendMessageToThread(this.threadId, 'user', this.userMessage);
      this.userMessage = '';
    }
  }

  scrollToBottom() {
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }

  // Gestione conversazione e messaggi

  startNewChat() {
    this.gptService.createThread().subscribe(
      (response) => {
        console.log('Thread creato con successo:', response);
        this.threadId = response.id; // Aggiorna correttamente la variabile di istanza
        localStorage.setItem('threadId', this.threadId);
        console.log('Thread creato con ID:' + this.threadId, this.threadId);
        this.chatVisible = true;
        this.showLoadingDots = false;
        this.messages = [];
      },
      (error) => {
        console.error('Errore durante la creazione del thread:', error);
      }
    );
  }

  // Funzione per inviare un messaggio al thread
  sendMessageToThread(threadId: string, role: string, content: string) {
    // Verifica se è stato caricato un assistente
    if (this.threadId !== '') {
      this.gptService.createMessage(threadId, role, content).subscribe(
        (response) => {
          console.log('Messaggio inviato con successo:', response);
          if (response && response.content && response.content.length > 0 && response.content[0].text) {
            const newMessage: Message = { text: response.content[0].text, isUser: false };
            this.scrollToBottom(); // Assicura che la finestra si sposti verso il basso per mostrare la nuova risposta
            this.startRun(threadId); // Avvia il processo di elaborazione della risposta
          } else {
            console.error('La risposta ricevuta da OpenAI non è valida:', response);
          }
        },
        (error) => {
          console.error('Errore durante l\'invio del messaggio:', error);
        }
      );
    } else {
      console.error('Thread ID non valido.');
    }
  }

  startRun(threadId: string) {
    this.gptService.createRun(threadId, "asst_rmoJjszoesBYtfbUMdnROBFy").pipe(
      switchMap(runResponse => {
        console.log('Run avviata con successo:', runResponse);
        this.runId = runResponse.id;
        return interval(100).pipe(
          startWith(0),
          concatMap(() => this.gptService.checkRunStatus(threadId, runResponse.id)),
          takeWhile(runStatusResponse => runStatusResponse.status === 'queued' || runStatusResponse.status === 'in_progress', true)
        );
      })
    ).subscribe(
      runStatusResponse => {
        console.log('Stato attuale:', runStatusResponse.status);
        if (runStatusResponse.status === 'completed' || runStatusResponse.status === 'failed') {
          console.log('Run conclusa:', runStatusResponse);
        }
        if (runStatusResponse.status === 'completed') {
          this.showLoadingDots = false;
          this.addNewMessage(threadId);
        } else if (runStatusResponse.status === 'failed') {
          console.log('Run fallita:', runStatusResponse);
          // Gestisci il caso di run fallita
        }
      },
      error => {
        console.error('Errore durante il polling dello stato della run:', error);
      }
    );
  }

  addNewMessage(threadId: string) {
    this.gptService.getThreadMessages(threadId).subscribe(
      response => {
        console.log('Messaggi del thread:', response);
        if (response && response.data) {
          this.messages.push({ text: response.data[0].content[0].text.value, isUser: false });
          this.typeMessage(response.data[0].content[0].text.value, false);
          this.cdr.detectChanges();
        }
      },
      error => {
        console.error('Errore durante il recupero dei messaggi del thread:', error);
      }
    );
  }

  loadInitialMessages(threadId: string) {
    this.gptService.getThreadMessages(threadId).subscribe(
      response => {
        console.log('Messaggi del thread:', response);
        if (response && response.data && response.data.length > 0) {
          this.messages = []; // Pulisci i messaggi esistenti se necessario

          // Inverti l'array per mostrare gli ultimi messaggi per ultimi
          const reversedData = response.data.slice().reverse();

          reversedData.forEach((item: { content: string | any[]; }, index: number) => {
            // L'indice ora sarà inverso, quindi cambia l'alternanza
            const isUser = (response.data.length - index) % 2 === 0;
            if (item.content && item.content.length > 0 && item.content[0].text && item.content[0].text.value) {
              this.messages.push({ text: item.content[0].text.value, isUser: isUser });
            }
          });
          this.scrollToBottom();
          this.cdr.detectChanges();
        }
      },
      error => {
        console.error('Errore durante il recupero dei messaggi del thread:', error);
      }
    );
  }

  typeMessage(message: string, isUser: boolean) {
    this.showLoadingDots = false;
    const words = message.split(" "); // Dividi il messaggio in parole per un effetto più naturale
    let currentMessage = '';
    let wordIndex = 0;

    const typingInterval = setInterval(() => {
      currentMessage += words[wordIndex] + " ";
      this.messages.push({ text: currentMessage.trim(), isUser: isUser }); // Aggiungi la parola corrente al messaggio

      // Aggiorna il messaggio esistente anziché aggiungerne uno nuovo
      if (this.messages.length > 1) {
        this.messages[this.messages.length - 2] = { text: currentMessage.trim(), isUser: isUser };
        this.messages.pop();
      }

      this.scrollToBottom();
      this.cdr.markForCheck(); // Aggiorna la vista
      wordIndex++;

      if (wordIndex === words.length) {
        clearInterval(typingInterval);
      }
    }, 100); // Intervallo tra le parole, regola il tempo per ottenere l'effetto desiderato
  }
}
