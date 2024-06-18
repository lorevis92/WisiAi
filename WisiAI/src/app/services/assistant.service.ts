import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assistant } from '../models/assistant';

@Injectable({
  providedIn: 'root'
})
export class AssistantService {
  private baseUrl = 'http://192.168.1.4:3001/assistant';
  private assistantData: Assistant | null = null;

  constructor(private http: HttpClient) { }

  getAllAssistants(): Observable<Assistant[]> {
    return this.http.get<Assistant[]>(this.baseUrl);
  }  

  getAssistantById(assistantId: string): Observable<Assistant> {
    return this.http.get<Assistant>(`${this.baseUrl}/${assistantId}`);
  }

  createAssistant(assistant: Assistant): Observable<Assistant> {
    return this.http.post<Assistant>(this.baseUrl, assistant);
  }

  updateAssistant(id: string, assistant: Assistant): Observable<Assistant> {
    return this.http.put<Assistant>(`${this.baseUrl}/${id}`, assistant);
  }

  deleteAssistant(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }


}
