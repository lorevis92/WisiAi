import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GptService {

  private baseUrl = 'https://api.openai.com/v1';
  private baseUrlAssistant = `${this.baseUrl}/assistants`;
  private baseUrlThread = `${this.baseUrl}/threads`;
  private apiKey = 'sk-proj-oAOcqfzAkWHsHqugwUYnT3BlbkFJQKXw9wwjbxeq3hlMjj91'; // Usa variabili d'ambiente in produzione

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.apiKey}`)
      .set('OpenAI-Beta', 'assistants=v1');
  }

  createAssistant(): Observable<any> {
    const headers = this.getHeaders();
    const requestBody = {
      model: 'gpt-4-turbo',
      instructions: 'Your instructions here...'
    };

    return this.http.post<any>(this.baseUrlAssistant, requestBody, { headers });
  }

  updateAssistant(assistantId: string, newData: any): Observable<any> {
    const url = `${this.baseUrlAssistant}/${assistantId}`;
    const headers = this.getHeaders();
  
    return this.http.post<any>(url, newData, { headers });
  }

  getAssistantById(assistantId: string): Observable<any> {
    const url = `${this.baseUrlAssistant}/${assistantId}`;
    const headers = this.getHeaders();
  
    return this.http.get<any>(url, { headers });
  }
  
  createThread(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.baseUrlThread, {}, { headers });
  }

  createMessage(threadId: string, role: string, content: string): Observable<any> {
    const url = `${this.baseUrlThread}/${threadId}/messages`;
    const headers = this.getHeaders();

    const requestBody = {
      role: role,
      content: content
    };

    return this.http.post<any>(url, requestBody, { headers });
  }

  createRun(threadId: string, assistantId: string): Observable<any> {
    const url = `${this.baseUrlThread}/${threadId}/runs`;
    const headers = this.getHeaders();
  
    const requestBody = {
      assistant_id: assistantId
    };
  
    return this.http.post<any>(url, requestBody, { headers });
  }

  checkRunStatus(threadId: string, runId: string) {
    const url = `${this.baseUrlThread}/${threadId}/runs/${runId}`;
    const headers = this.getHeaders();

    return this.http.get<any>(url, { headers });
  }

  getRunResult(threadId: string, runId: string): Observable<any> {
    const url = `${this.baseUrlThread}/${threadId}/runs/${runId}/result`;
    const headers = this.getHeaders();

    return this.http.get<any>(url, { headers });
  }

  getThreadMessages(threadId: string): Observable<any> {
    const url = `${this.baseUrlThread}/${threadId}/messages`;
    const headers = this.getHeaders();

    return this.http.get<any>(url, { headers });
  }


}
