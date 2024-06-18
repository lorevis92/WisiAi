import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AssistantService } from 'src/app/services/assistant.service';
import { HttpClientModule } from '@angular/common/http';
import { Assistant } from'src/app/models/assistant';
import { GptService } from 'src/app/services/gpt.service';


@Component({
  selector: 'app-assistants',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: `./assistants.component.html`,
  styleUrls: ['./assistants.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssistantsComponent {
  assistants: Assistant[] = [];
  creationMessage: string | null = null;
  selectedAssistantId: string | null = null;
  selectedAssistantName: string | null = null;

  constructor(private assistantService: AssistantService, private cdr: ChangeDetectorRef, private gptService: GptService) {
    const storedAssistantId = localStorage.getItem('selectedAssistantId');
    this.selectedAssistantId = storedAssistantId ? storedAssistantId : null;
  }

  ngOnInit(): void {
    // Recupera il nome dell'assistente dal localStorage
    this.selectedAssistantName = localStorage.getItem('selectedAssistantName');
    this.assistantService.getAllAssistants().subscribe(
      assistants => {
        this.assistants = assistants;
        console.log('Assistants:', this.assistants); 
        this.cdr.detectChanges();
      },
      error => {
        console.error('Errore durante il recupero degli assistenti:', error);
      }
    );
  }

  createAssistant(): void {
    this.assistantService.createAssistant({} as Assistant).subscribe(
      (newAssistant) => {
        this.creationMessage = `Assistente creato. Selezionalo e vai nelle impostazioni per dargli l'aspetto che preferisci.`;
        // Aggiorna la lista degli assistenti
        this.assistantService.getAllAssistants().subscribe(
          assistants => {
            this.assistants = assistants;
            console.log('Assistants:', this.assistants);
            this.cdr.detectChanges();
          },
          error => {
            console.error('Errore durante il recupero degli assistenti:', error);
          }
        );
      },
      error => {
        console.error('Errore durante la creazione dell\'assistente:', error);
      }
    );
  }

  createOpenAIAssistant(): void {
    this.gptService.createAssistant().subscribe(
      (response) => {
        console.log('Nuovo assistente creato su OpenAI:', response);
        // Aggiungi qui la logica per gestire la risposta
      },
      (error) => {
        console.error('Errore durante la creazione dell\'assistente su OpenAI:', error.error);
        // Gestisci l'errore qui
      }
    );
  }

  selectAssistant(assistantId: string | undefined): void {
    if (!assistantId) {
      return; // Ignora se assistantId è undefined
    }
    this.selectedAssistantId = assistantId;
    // Salva l'ID nell'LocalStorage
    localStorage.setItem('selectedAssistantId', assistantId);
    const selectedAssistant = this.assistants.find(a => a.assistantId === assistantId);
    if (selectedAssistant) {
      localStorage.setItem('selectedAssistantName', selectedAssistant.assistantName);
    }
  }


  getSelectedAssistantName(): string | null {
    // Restituisci il nome dell'assistente in base all'ID selezionato
    const selectedAssistant = this.assistants.find(a => a.assistantId === this.selectedAssistantId);
    return selectedAssistant ? selectedAssistant.assistantName : null;
  }
}

