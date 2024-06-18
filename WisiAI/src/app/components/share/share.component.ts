import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-share',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl:'./share.component.html',
  styleUrls: ['./share.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShareComponent { 
  selectedAssistantId: number | null = null;
  selectedAssistantName: string | null = null;

  ngOnInit(): void {
    // Recupera l'ID dell'assistente selezionato dal localStorage
    const storedAssistantId = localStorage.getItem('selectedAssistantId');
    this.selectedAssistantId = storedAssistantId ? parseInt(storedAssistantId, 10) : null;

    // Recupera il nome dell'assistente dal localStorage
    this.selectedAssistantName = localStorage.getItem('selectedAssistantName');
  }

}
