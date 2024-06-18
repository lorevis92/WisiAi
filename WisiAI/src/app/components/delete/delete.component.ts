import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AssistantService } from 'src/app/services/assistant.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DeleteComponent { 
  selectedAssistantId: string | null = null;
  selectedAssistantName: string | null = null;
  deletionMessage: string = '';

  ngOnInit(): void {
    // Recupera l'ID dell'assistente selezionato dal localStorage
    this.selectedAssistantId = localStorage.getItem('selectedAssistantId');

    // Recupera il nome dell'assistente dal localStorage
    this.selectedAssistantName = localStorage.getItem('selectedAssistantName');
  }

  constructor(private assistantService: AssistantService) { }

  confirmDelete(): void {
    if (this.selectedAssistantId) {
      this.assistantService.deleteAssistant(this.selectedAssistantId).subscribe(
        () => {
          // Eliminazione riuscita
          this.deletionMessage = `Assistant ${this.selectedAssistantName} deleted successfully`;
          // Aggiorna l'interfaccia dopo l'eliminazione
          localStorage.removeItem('selectedAssistantId');
          localStorage.removeItem('selectedAssistantName');
          this.selectedAssistantId = null;
          this.selectedAssistantName = null;
        },
        (error) => {
          // Gestione degli errori
          console.error('Error deleting assistant:', error);
          this.deletionMessage = 'Error deleting assistant. Please try again later.';
        }
      );
    }
  }
}
