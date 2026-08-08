import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CatalogosService {
  API_URL = `${environment.apiUrl}/Catalogos`;
  constructor(private http: HttpClient) {}

  getRol() {
    return this.http.get(`${this.API_URL}/Rol`);
  }

  getEstatus() {
    return this.http.get(`${this.API_URL}/Estatus`);
  }

  getIdioma() {
    return this.http.get(`${this.API_URL}/Idioma`);
  }

  getGenero() {
    return this.http.get(`${this.API_URL}/Genero`);
  }

  getContinente() {
    return this.http.get(`${this.API_URL}/Continente`);
  }

  getInterpretacion() {
    return this.http.get(`${this.API_URL}/Interpretacion`);
  }

  getTipoVoz() {
    return this.http.get(`${this.API_URL}/TipoVoz`);
  }
}
