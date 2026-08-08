import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Artista } from '../Models/Artista';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {
  API_URL = `${environment.apiUrl}/Artista`;

  constructor(private http: HttpClient) { }

  getLista(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}`);
  }

  getById(id: number): Observable<Artista> {
    return this.http.get<Artista>(`${this.API_URL}/${id}`);
  }

  create(form: Artista): Observable<Artista> {
    return this.http.post<Artista>(`${this.API_URL}`, form);
  }

  update(id: number, form: Artista): Observable<Artista> {
    return this.http.put<Artista>(`${this.API_URL}/${id}`, form);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
