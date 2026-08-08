import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ArtistaGrupo } from '../Models/ArtistaGrupo';

@Injectable({
  providedIn: 'root'
})
export class ArtistaGrupoService {
  API_URL = `${environment.apiUrl}/ArtistaGrupo`;

  constructor(private http: HttpClient) { }

  getLista(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}`);
  }

  getById(id: number): Observable<ArtistaGrupo> {
    return this.http.get<ArtistaGrupo>(`${this.API_URL}/${id}`);
  }

  create(form: ArtistaGrupo): Observable<ArtistaGrupo> {
    return this.http.post<ArtistaGrupo>(`${this.API_URL}`, form);
  }

  update(id: number, form: ArtistaGrupo): Observable<ArtistaGrupo> {
    return this.http.put<ArtistaGrupo>(`${this.API_URL}/${id}`, form);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
