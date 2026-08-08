import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//#region Idioma
import localeEsMX from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEsMX);
//#endregion Idioma

//#region Formularios
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomGlobalFilterPipe } from './Shared/custom-filter.pipe';
//#endregion Formularios

//#region EnvioAuth
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { AuthService } from './Services/auth.service';
//#endregion EnvioAuth

//#region Angular Material
import { ExportButtonComponent } from './Shared/Components/export-button/export-button.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlEsp } from './Shared/mat-paginator-intl';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { NgChartsModule } from 'ng2-charts';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
//#endregion Angular Material

//#region Nav
import { NavigationComponent } from './Componentes/navigation/navigation.component';
import { FooterComponent } from './Componentes/footer/footer.component';
import { PrincipalComponent } from './Componentes/Repertorio/principal/principal.component';
import { SinPermisoComponent } from './Componentes/Repertorio/sin-permiso/sin-permiso.component';
//#endregion Nav

//#region Login
import { LoginComponent } from './Componentes/Auth/login/login.component';
import { RegisterComponent } from './Componentes/Auth/register/register.component';
import { ResetPasswordComponent } from './Componentes/Auth/reset-password/reset-password.component';
//#endregion Login

//#region Usuario
import { UsuarioListComponent } from './Componentes/Repertorio/Usuarios/usuario-list/usuario-list.component';
import { PerfilComponent } from './Componentes/Repertorio/Usuarios/perfil/perfil.component';
import { BitacoraErrorComponent } from './Componentes/Repertorio/Bitacora/bitacora-error/bitacora-error.component';
import { BitacoraCargaComponent } from './Componentes/Repertorio/Bitacora/bitacora-carga/bitacora-carga.component';
import { PaisFormComponent } from './Componentes/Repertorio/Pais/pais-form/pais-form.component';
import { PaisListComponent } from './Componentes/Repertorio/Pais/pais-list/pais-list.component';
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
import { CancionesFormComponent } from './Componentes/Repertorio/Canciones/canciones-form/canciones-form.component';
import { CancionesListComponent } from './Componentes/Repertorio/Canciones/canciones-list/canciones-list.component';
import { ArtistaGrupoListComponent } from './Componentes/Repertorio/ArtistaGrupo/artista-grupo-list/artista-grupo-list.component';
import { ArtistaGrupoFormComponent } from './Componentes/Repertorio/ArtistaGrupo/artista-grupo-form/artista-grupo-form.component';
import { CancionesAlbumFormComponent } from './Componentes/Repertorio/CancionesAlbum/canciones-album-form/canciones-album-form.component';
import { CancionesAlbumListComponent } from './Componentes/Repertorio/CancionesAlbum/canciones-album-list/canciones-album-list.component';
import { InstrumentoArtistaFormComponent } from './Componentes/Repertorio/InstrumentoArtista/instrumento-artista-form/instrumento-artista-form.component';
import { InstrumentoArtistaListComponent } from './Componentes/Repertorio/InstrumentoArtista/instrumento-artista-list/instrumento-artista-list.component';
import { BuscarArtistaComponent } from './Componentes/Repertorio/Busqueda/buscar-artista/buscar-artista.component';
import { BuscarCancionesComponent } from './Componentes/Repertorio/Busqueda/buscar-canciones/buscar-canciones.component';
import { BuscarAlbumComponent } from './Componentes/Repertorio/Busqueda/buscar-album/buscar-album.component';
import { BuscarPistasAlbumComponent } from './Componentes/Repertorio/Busqueda/buscar-pistas-album/buscar-pistas-album.component';
//#endregion Usuario

@NgModule({
  declarations: [
    AppComponent,
    ExportButtonComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    FooterComponent,
    NavigationComponent,
    BitacoraCargaComponent,
    BitacoraErrorComponent,
    PrincipalComponent,
    SinPermisoComponent,
    PerfilComponent,
    UsuarioListComponent,
    CustomGlobalFilterPipe,
    PaisFormComponent,
    PaisListComponent,
    InstrumentoListComponent,
    InstrumentoFormComponent,
    ArtistaListComponent,
    ArtistaFormComponent,
    GrupoListComponent,
    GrupoFormComponent,
    DisqueraListComponent,
    DisqueraFormComponent,
    AlbumListComponent,
    AlbumFormComponent,
    CancionesFormComponent,
    CancionesListComponent,
    ArtistaGrupoListComponent,
    ArtistaGrupoFormComponent,
    CancionesAlbumFormComponent,
    CancionesAlbumListComponent,
    InstrumentoArtistaFormComponent,
    InstrumentoArtistaListComponent,
    BuscarArtistaComponent,
    BuscarCancionesComponent,
    BuscarAlbumComponent,
    BuscarPistasAlbumComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatSelectModule,
    NgChartsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX' },
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlEsp },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
