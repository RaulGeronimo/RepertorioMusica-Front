import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  API_URL = `${environment.apiUrl}/Buscar`;

  URL_Grupo = `${this.API_URL}/Grupo`;
  URL_Album = `${this.API_URL}/Album`

  constructor(private http: HttpClient) { }

  //#region Grupo
  getGrupoId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_Grupo}/${id}`);
  }

  getGrupoAlbumes(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_Grupo}/Album/${id}`);
  }

  getGrupoCanciones(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_Grupo}/Cancion/${id}`);
  }

  getGrupoIntegrantes(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_Grupo}/Integrante/${id}`);
  }
  //#endregion Grupo

  //#region Album
  getAlbumId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_Album}/${id}`);
  }

  getAlbumCanciones(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_Album}/Cancion/${id}`);
  }
  //#endregion Album
}
