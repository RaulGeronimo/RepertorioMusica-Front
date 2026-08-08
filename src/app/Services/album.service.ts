import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Album } from '../Models/Album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  API_URL = `${environment.apiUrl}/Album`;

  constructor(private http: HttpClient) { }

  getLista(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}`);
  }

  getById(id: number): Observable<Album> {
    return this.http.get<Album>(`${this.API_URL}/${id}`);
  }

  create(form: Album): Observable<Album> {
    return this.http.post<Album>(`${this.API_URL}`, form);
  }

  update(id: number, form: Album): Observable<Album> {
    return this.http.put<Album>(`${this.API_URL}/${id}`, form);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
