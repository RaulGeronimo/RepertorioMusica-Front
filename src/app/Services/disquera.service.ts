import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Disquera } from '../Models/Disquera';

@Injectable({
  providedIn: 'root'
})
export class DisqueraService {
  API_URL = `${environment.apiUrl}/Disquera`;

  constructor(private http: HttpClient) { }

  getLista(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}`);
  }

  getById(id: number): Observable<Disquera> {
    return this.http.get<Disquera>(`${this.API_URL}/${id}`);
  }

  create(form: Disquera): Observable<Disquera> {
    return this.http.post<Disquera>(`${this.API_URL}`, form);
  }

  update(id: number, form: Disquera): Observable<Disquera> {
    return this.http.put<Disquera>(`${this.API_URL}/${id}`, form);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
