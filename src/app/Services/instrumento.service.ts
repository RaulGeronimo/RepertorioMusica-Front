import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Instrumento } from '../Models/Instrumento';

@Injectable({
  providedIn: 'root'
})
export class InstrumentoService {
  API_URL = `${environment.apiUrl}/Instrumento`;

  constructor(private http: HttpClient) { }

  getLista(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}`);
  }

  getById(id: number): Observable<Instrumento> {
    return this.http.get<Instrumento>(`${this.API_URL}/${id}`);
  }

  create(form: Instrumento): Observable<Instrumento> {
    return this.http.post<Instrumento>(`${this.API_URL}`, form);
  }

  update(id: number, form: Instrumento): Observable<Instrumento> {
    return this.http.put<Instrumento>(`${this.API_URL}/${id}`, form);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
