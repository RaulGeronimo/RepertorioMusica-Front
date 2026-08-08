import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//#region Login
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { LoginComponent } from './Componentes/Auth/login/login.component';
import { RegisterComponent } from './Componentes/Auth/register/register.component';
import { ResetPasswordComponent } from './Componentes/Auth/reset-password/reset-password.component';
//#endregion Login

import { PermisosGuard } from './guards/permisos.guard';
import { PrincipalComponent } from './Componentes/Repertorio/principal/principal.component';
import { UsuarioListComponent } from './Componentes/Repertorio/Usuarios/usuario-list/usuario-list.component';
import { PerfilComponent } from './Componentes/Repertorio/Usuarios/perfil/perfil.component';
import { BitacoraCargaComponent } from './Componentes/Repertorio/Bitacora/bitacora-carga/bitacora-carga.component';
import { BitacoraErrorComponent } from './Componentes/Repertorio/Bitacora/bitacora-error/bitacora-error.component';
import { SinPermisoComponent } from './Componentes/Repertorio/sin-permiso/sin-permiso.component';

import { PaisListComponent } from './Componentes/Repertorio/Pais/pais-list/pais-list.component';
import { PaisFormComponent } from './Componentes/Repertorio/Pais/pais-form/pais-form.component';
import { InstrumentoListComponent } from './Componentes/Repertorio/Instrumento/instrumento-list/instrumento-list.component';
import { InstrumentoFormComponent } from './Componentes/Repertorio/Instrumento/instrumento-form/instrumento-form.component';
import { ArtistaListComponent } from './Componentes/Repertorio/Artista/artista-list/artista-list.component';
import { ArtistaFormComponent } from './Componentes/Repertorio/Artista/artista-form/artista-form.component';
import { GrupoListComponent } from './Componentes/Repertorio/Grupo/grupo-list/grupo-list.component';
import { GrupoFormComponent } from './Componentes/Repertorio/Grupo/grupo-form/grupo-form.component';
import { DisqueraListComponent } from './Componentes/Repertorio/Disquera/disquera-list/disquera-list.component';
import { DisqueraFormComponent } from './Componentes/Repertorio/Disquera/disquera-form/disquera-form.component';
import { AlbumListComponent } from './Componentes/Repertorio/Album/album-list/album-list.component';
import { AlbumFormComponent } from './Componentes/Repertorio/Album/album-form/album-form.component';
import { CancionesListComponent } from './Componentes/Repertorio/Canciones/canciones-list/canciones-list.component';
import { CancionesFormComponent } from './Componentes/Repertorio/Canciones/canciones-form/canciones-form.component';
import { ArtistaGrupoListComponent } from './Componentes/Repertorio/ArtistaGrupo/artista-grupo-list/artista-grupo-list.component';
import { ArtistaGrupoFormComponent } from './Componentes/Repertorio/ArtistaGrupo/artista-grupo-form/artista-grupo-form.component';
import { CancionesAlbumListComponent } from './Componentes/Repertorio/CancionesAlbum/canciones-album-list/canciones-album-list.component';
import { CancionesAlbumFormComponent } from './Componentes/Repertorio/CancionesAlbum/canciones-album-form/canciones-album-form.component';
import { InstrumentoArtistaListComponent } from './Componentes/Repertorio/InstrumentoArtista/instrumento-artista-list/instrumento-artista-list.component';
import { InstrumentoArtistaFormComponent } from './Componentes/Repertorio/InstrumentoArtista/instrumento-artista-form/instrumento-artista-form.component';
import { BuscarAlbumComponent } from './Componentes/Repertorio/Busqueda/buscar-album/buscar-album.component';
import { BuscarCancionesComponent } from './Componentes/Repertorio/Busqueda/buscar-canciones/buscar-canciones.component';
import { BuscarArtistaComponent } from './Componentes/Repertorio/Busqueda/buscar-artista/buscar-artista.component';
import { BuscarPistasAlbumComponent } from './Componentes/Repertorio/Busqueda/buscar-pistas-album/buscar-pistas-album.component';

const routes: Routes = [
  //#region Rutas Públicas
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'reset',
    component: ResetPasswordComponent,
    canActivate: [NoAuthGuard],
  },
  //#endregion Rutas Públicas

  //#region Rutas Protegidas
  {
    path: 'repertorio',
    component: PrincipalComponent,
    canActivate: [AuthGuard], // Solo autenticación aquí
    canActivateChild: [PermisosGuard], // Guard para todas las rutas hijas
    children: [
      { path: '', redirectTo: 'grupo', pathMatch: 'full' },

      //#region Bitácoras
      {
        path: 'bitacoraCarga',
        component: BitacoraCargaComponent,
        data: { seccion: 'Bitácoras', permiso: 'puedeVer' },
      },
      {
        path: 'bitacoraError',
        component: BitacoraErrorComponent,
        data: { seccion: 'Bitácoras', permiso: 'puedeVer' },
      },
      //#endregion Bitácoras

      //#region Usuarios
      {
        path: 'users',
        component: UsuarioListComponent,
        data: { seccion: 'Usuarios', permiso: 'puedeVer' },
      },
      {
        path: 'profile',
        component: PerfilComponent,
      },
      //#endregion Usuarios

      //#region Pais
      {
        path: 'pais',
        component: PaisListComponent,
        data: { seccion: 'País', permiso: 'puedeVer' },
      },
      {
        path: 'pais/agregar',
        component: PaisFormComponent,
        data: { seccion: 'País', permiso: 'puedeCrear' },
      },
      {
        path: 'pais/actualizar/:id',
        component: PaisFormComponent,
        data: { seccion: 'País', permiso: 'puedeEditar' },
      },
      //#endregion Pais

      //#region Instrumento
      {
        path: 'instrumento',
        component: InstrumentoListComponent,
        data: { seccion: 'Instrumento', permiso: 'puedeVer' },
      },
      {
        path: 'instrumento/agregar',
        component: InstrumentoFormComponent,
        data: { seccion: 'Instrumento', permiso: 'puedeCrear' },
      },
      {
        path: 'instrumento/actualizar/:id',
        component: InstrumentoFormComponent,
        data: { seccion: 'Instrumento', permiso: 'puedeEditar' },
      },
      //#endregion Instrumento

      //#region Artista
      {
        path: 'artista',
        component: ArtistaListComponent,
        data: { seccion: 'Artista', permiso: 'puedeVer' },
      },
      {
        path: 'artista/agregar',
        component: ArtistaFormComponent,
        data: { seccion: 'Artista', permiso: 'puedeCrear' },
      },
      {
        path: 'artista/actualizar/:id',
        component: ArtistaFormComponent,
        data: { seccion: 'Artista', permiso: 'puedeEditar' },
      },
      //#endregion Artista

      //#region Grupo
      {
        path: 'grupo',
        component: GrupoListComponent,
        data: { seccion: 'Grupo', permiso: 'puedeVer' },
      },
      {
        path: 'grupo/agregar',
        component: GrupoFormComponent,
        data: { seccion: 'Grupo', permiso: 'puedeCrear' },
      },
      {
        path: 'grupo/actualizar/:id',
        component: GrupoFormComponent,
        data: { seccion: 'Grupo', permiso: 'puedeEditar' },
      },
      //#endregion Grupo

      //#region Disquera
      {
        path: 'disquera',
        component: DisqueraListComponent,
        data: { seccion: 'Disquera', permiso: 'puedeVer' },
      },
      {
        path: 'disquera/agregar',
        component: DisqueraFormComponent,
        data: { seccion: 'Disquera', permiso: 'puedeCrear' },
      },
      {
        path: 'disquera/actualizar/:id',
        component: DisqueraFormComponent,
        data: { seccion: 'Disquera', permiso: 'puedeEditar' },
      },
      //#endregion Disquera

      //#region Album
      {
        path: 'album',
        component: AlbumListComponent,
        data: { seccion: 'Álbum', permiso: 'puedeVer' },
      },
      {
        path: 'album/agregar',
        component: AlbumFormComponent,
        data: { seccion: 'Álbum', permiso: 'puedeCrear' },
      },
      {
        path: 'album/actualizar/:id',
        component: AlbumFormComponent,
        data: { seccion: 'Álbum', permiso: 'puedeEditar' },
      },
      //#endregion Album

      //#region Cancion
      {
        path: 'cancion',
        component: CancionesListComponent,
        data: { seccion: 'Canción', permiso: 'puedeVer' },
      },
      {
        path: 'cancion/agregar',
        component: CancionesFormComponent,
        data: { seccion: 'Canción', permiso: 'puedeCrear' },
      },
      {
        path: 'cancion/actualizar/:id',
        component: CancionesFormComponent,
        data: { seccion: 'Canción', permiso: 'puedeEditar' },
      },
      //#endregion Cancion

      //#region ArtistaGrupo
      {
        path: 'artistaGrupo',
        component: ArtistaGrupoListComponent,
        data: { seccion: 'Artista Grupo', permiso: 'puedeVer' },
      },
      {
        path: 'artistaGrupo/agregar',
        component: ArtistaGrupoFormComponent,
        data: { seccion: 'Artista Grupo', permiso: 'puedeCrear' },
      },
      {
        path: 'artistaGrupo/actualizar/:id',
        component: ArtistaGrupoFormComponent,
        data: { seccion: 'Artista Grupo', permiso: 'puedeEditar' },
      },
      //#endregion ArtistaGrupo

      //#region CancionAlbum
      {
        path: 'cancionesAlbum',
        component: CancionesAlbumListComponent,
        data: { seccion: 'Canción Álbum', permiso: 'puedeVer' },
      },
      {
        path: 'cancionesAlbum/agregar',
        component: CancionesAlbumFormComponent,
        data: { seccion: 'Canción Álbum', permiso: 'puedeCrear' },
      },
      {
        path: 'cancionesAlbum/actualizar/:id',
        component: CancionesAlbumFormComponent,
        data: { seccion: 'Canción Álbum', permiso: 'puedeEditar' },
      },
      //#endregion CancionAlbum

      //#region InstrumentoArtista
      {
        path: 'instrumentoArtista',
        component: InstrumentoArtistaListComponent,
        data: { seccion: 'Instrumento Artista Grupo', permiso: 'puedeVer' },
      },
      {
        path: 'instrumentoArtista/agregar',
        component: InstrumentoArtistaFormComponent,
        data: { seccion: 'Instrumento Artista Grupo', permiso: 'puedeCrear' },
      },
      {
        path: 'instrumentoArtista/actualizar/:id',
        component: InstrumentoArtistaFormComponent,
        data: { seccion: 'Instrumento Artista Grupo', permiso: 'puedeEditar' },
      },
      //#endregion InstrumentoArtista

      //#region Busqueda
      {
        path: 'buscar/album/:id',
        component: BuscarAlbumComponent,
        data: {
          permisos: [
            { seccion: 'Grupo', permiso: 'puedeVer' },
            { seccion: 'Álbum', permiso: 'puedeVer' },
          ],
        },
      },
      {
        path: 'buscar/cancion/:id',
        component: BuscarCancionesComponent,
        data: {
          permisos: [
            { seccion: 'Grupo', permiso: 'puedeVer' },
            { seccion: 'Canción', permiso: 'puedeVer' },
          ],
        },
      },
      {
        path: 'buscar/integrante/:id',
        component: BuscarArtistaComponent,
        data: {
          permisos: [
            { seccion: 'Grupo', permiso: 'puedeVer' },
            { seccion: 'Artista Grupo', permiso: 'puedeVer' },
          ],
        },
      },
      {
        path: 'buscar/album/cancion/:id',
        component: BuscarPistasAlbumComponent,
        data: {
          permisos: [
            { seccion: 'Álbum', permiso: 'puedeVer' },
            { seccion: 'Canción', permiso: 'puedeVer' },
          ],
        },
      },
      //#endregion Busqueda
    ],
  },
  //#endregion Rutas Protegidas
  { path: 'no-autorizado', component: SinPermisoComponent },

  { path: '**', redirectTo: '/repertorio/caricaturas', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
