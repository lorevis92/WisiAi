import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsnavbarComponent } from "../../settingsnavbar/settingsnavbar.component";
import { GptService } from 'src/app/services/gpt.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-model',
  standalone: true,
  templateUrl: `./model.component.html`,
  styleUrls: ['./model.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    SettingsnavbarComponent
  ]
})

export class ModelComponent implements OnInit { 
  instructions: string = '';
  name: string = '';
  model: string = '';
  temperature!: number ;
  dataLoaded: boolean = false;
  

    constructor(private gptService: GptService, private cdr: ChangeDetectorRef) {}

    ngOnInit() {
      // Recupera l'assistente all'inizializzazione del componente
      this.gptService.getAssistantById('asst_rmoJjszoesBYtfbUMdnROBFy').subscribe(
        (response) => {
          // Assegna i valori dell'assistente alle variabili del componente per visualizzarli nel form
          this.instructions = response.instructions;
          this.name = response.name;
          this.model = response.model;
          this.temperature = response.temperature;
          console.log(this.instructions);
          this.dataLoaded = true;
          
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Errore durante il recupero dell\'assistente:', error);
          // Gestisci l'errore qui
        }
      );
    }
    
    onFormSubmit() {

      const newAssistantData = {
        instructions: this.instructions,
        model: this.model,
        name: this.name,
        temperature: this.temperature
      };
        // Puoi inserire qui la logica per salvare i dati come desiderato
        console.log('Istruzioni:', this.instructions);
        console.log('Modello selezionato:', this.model);
        console.log('Temperatura selezionata:', this.temperature);
        // Aggiungi la logica di salvataggio qui...
         // Chiamata al servizio per modificare l'assistente
    this.gptService.updateAssistant('asst_rmoJjszoesBYtfbUMdnROBFy', newAssistantData).subscribe(
      (response) => {
        console.log('Assistente modificato con successo:', response);
        // Gestire la risposta qui
      },
      (error) => {
        console.error('Errore durante la modifica dell\'assistente:', error);
        // Gestire l'errore qui
      }
    );
      }
}
