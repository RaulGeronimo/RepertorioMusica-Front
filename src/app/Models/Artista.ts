export interface Artista {
    artistaId?: number;
    nombre?: string;
    nombreArtistico?: string;
    generoId?: number;
    fechaNacimiento?: string;
    fechaFinado?: string | null;
    estatura?: string;
    paisId?: number;
    instrumentos?: string;
    tipoVozId?: number;
    foto?: string;
}