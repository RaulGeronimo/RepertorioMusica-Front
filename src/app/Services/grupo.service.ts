import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Grupo } from '../Models/Grupo';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  API_URL = `${environment.apiUrl}/Grupo`;

  constructor(private http: HttpClient) { }

  getLista(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}`);
  }

  getById(id: number): Observable<Grupo> {
    return this.http.get<Grupo>(`${this.API_URL}/${id}`);
  }

  create(form: Grupo): Observable<Grupo> {
    return this.http.post<Grupo>(`${this.API_URL}`, form);
  }

  update(id: number, form: Grupo): Observable<Grupo> {
    return this.http.put<Grupo>(`${this.API_URL}/${id}`, form);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
