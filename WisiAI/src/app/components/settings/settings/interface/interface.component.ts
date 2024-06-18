import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InterfacciaChatComponent } from "../../../sources/components/interfacciaChat/interfacciaChat.component";
import { FormsModule } from '@angular/forms';
import { SettingsnavbarComponent } from "../../settingsnavbar/settingsnavbar.component";
import { AssistantService } from 'src/app/services/assistant.service';
import { Assistant } from 'src/app/models/assistant';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-interface',
    standalone: true,
    templateUrl: `./interface.component.html`,
    styleUrls: ['./interface.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        InterfacciaChatComponent,
        FormsModule,
        SettingsnavbarComponent,
        HttpClientModule,
    ]
})

export class InterfaceComponent implements OnInit { 
    assistantId = localStorage.getItem('selectedAssistantId')!;
    @Input() assistant: Assistant = {
      assistantName: 'fgffg',
      assistantImage: '',
      assistantSubtitle: '',
      assistantBackgroundColor: '',
      assistantTextColor: '',
      messaggioIniziale: '',
      instructions: '',
      selectedModel: '',
      selectedTemperature: 0
    };
    @Output() assistantNameChange: EventEmitter<string> = new EventEmitter<string>();

    constructor(private assistantService: AssistantService) { }
    ngOnInit(): void {
      this.assistantService.getAssistantById(this.assistantId).subscribe(
        (response) => {
          this.assistant = response;
        },
        (error) => {
          console.error('Errore durante il recupero dei dati dell\'assistente:', error);
        }
      );
      }

      onInputChange() {
        // Puoi eseguire eventuali azioni qui se desideri gestire l'input in tempo reale
        // In questo caso, non è necessario fare nulla, ma è necessario avere questo metodo per far funzionare l'evento (input)
      }
    onFormSubmit() {
      if (this.assistant) {
        // Creazione del payload nel formato richiesto dal backend
        const payload = {
            assistantName: this.assistant.assistantName,
            assistantImage: this.assistant.assistantImage,
            assistantSubtitle: this.assistant.assistantSubtitle,
            assistantBackgroundColor: this.assistant.assistantBackgroundColor,
            assistantTextColor: this.assistant.assistantTextColor,
            messaggioIniziale: this.assistant.messaggioIniziale,
            instructions: this.assistant.instructions,
            selectedModel: this.assistant.selectedModel,
            selectedTemperature: this.assistant.selectedTemperature
        };

        // Chiamata al metodo updateAssistant del servizio AssistantService per aggiornare i dati dell'assistente nel backend
        this.assistantService.updateAssistant(this.assistantId, payload).subscribe(
            (response) => {
                console.log('Dati dell\'assistente aggiornati con successo:', response);
                // Puoi implementare eventuali azioni aggiuntive qui, come mostrare una notifica di successo
            },
            (error) => {
                console.error('Errore durante l\'aggiornamento dei dati dell\'assistente:', error);
                // Puoi implementare eventuali azioni aggiuntive qui, come mostrare un messaggio di errore
            }
        );
    }
    }
}