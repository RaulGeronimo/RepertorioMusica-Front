import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Cancion } from '../Models/Cancion';

@Injectable({
  providedIn: 'root'
})
export class CancionService {
  API_URL = `${environment.apiUrl}/Cancion`;

  constructor(private http: HttpClient) { }

  getLista(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}`);
  }

  getById(id: number): Observable<Cancion> {
    return this.http.get<Cancion>(`${this.API_URL}/${id}`);
  }

  create(form: Cancion): Observable<Cancion> {
    return this.http.post<Cancion>(`${this.API_URL}`, form);
  }

  update(id: number, form: Cancion): Observable<Cancion> {
    return this.http.put<Cancion>(`${this.API_URL}/${id}`, form);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
