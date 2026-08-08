import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Pais } from '../Models/Pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  API_URL = `${environment.apiUrl}/Pais`;

  constructor(private http: HttpClient) { }

  getLista(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}`);
  }

  getById(id: number): Observable<Pais> {
    return this.http.get<Pais>(`${this.API_URL}/${id}`);
  }

  create(form: Pais): Observable<Pais> {
    return this.http.post<Pais>(`${this.API_URL}`, form);
  }

  update(id: number, form: Pais): Observable<Pais> {
    return this.http.put<Pais>(`${this.API_URL}/${id}`, form);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
