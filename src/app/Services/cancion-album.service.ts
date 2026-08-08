import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CancionAlbum } from '../Models/CancionAlbum';

@Injectable({
  providedIn: 'root'
})
export class CancionAlbumService {
  API_URL = `${environment.apiUrl}/CancionAlbum`;

  constructor(private http: HttpClient) { }

  getLista(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}`);
  }

  getById(id: number): Observable<CancionAlbum> {
    return this.http.get<CancionAlbum>(`${this.API_URL}/${id}`);
  }

  create(form: CancionAlbum): Observable<CancionAlbum> {
    return this.http.post<CancionAlbum>(`${this.API_URL}`, form);
  }

  update(id: number, form: CancionAlbum): Observable<CancionAlbum> {
    return this.http.put<CancionAlbum>(`${this.API_URL}/${id}`, form);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
