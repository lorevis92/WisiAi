export interface Assistant {
    assistantId?: string; // L'ID potrebbe essere opzionale se non è sempre presente
    assistantName: string;
    assistantImage: string;
    assistantSubtitle: string;
    assistantBackgroundColor: string;
    assistantTextColor: string;
    messaggioIniziale: string;
    instructions: string;
    selectedModel: string;
    selectedTemperature: number;
  }
  
