import { Component } from '@angular/core';
import { AlertasService } from 'src/app/Services/alertas.service';
import { AuthService } from 'src/app/Services/auth.service';
import { PermisosService } from 'src/app/Services/permisos.service';
import { Seccion } from 'src/app/enum/seccion.enum';
import { Rol } from 'src/app/enum/Rol.enum';
import { environment } from 'src/environments/environment';
import {
  NavDropdownItem,
  NavExternalLinkItem,
  NavItem,
  NavLinkItem,
} from 'src/app/Models/NavItem';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  //#region Permisos
  Seccion = Seccion;
  Rol = Rol;
  proyecto = environment.proyecto;
  URL_Anime = environment.urlAnime;
  URL_Musica = environment.urlMusica;
  URL_Series = environment.urlSeries;
  //#endregion Permisos

  //#region Principal
  navItemsPrincipal: NavItem[] = [
    {
      tipo: 'dropdown',
      nombre: 'Album',
      seccion: Seccion.Album,
      items: [
        { nombre: 'Lista', routerLink: ['album'] },
        {
          nombre: 'Canciones del Álbum',
          routerLink: ['cancionesAlbum'],
          seccion: Seccion.CancionAlbum,
          accion: 'ver',
          divisorAntes: true,
        },
        {
          nombre: 'Agregar Canciones',
          routerLink: ['cancionesAlbum/agregar'],
          seccion: Seccion.CancionAlbum,
          accion: 'crear',
        },
      ],
    },
    {
      tipo: 'dropdown',
      nombre: 'Artista',
      seccion: Seccion.Artista,
      items: [
        { nombre: 'Lista', routerLink: ['artista'] },
        {
          nombre: 'Instrumentos por Artista',
          routerLink: ['instrumentoArtista'],
          seccion: Seccion.InstrumentoArtistaGrupo,
          accion: 'ver',
          divisorAntes: true,
        },
        {
          nombre: 'Agregar Instrumento',
          routerLink: ['instrumentoArtista/agregar'],
          seccion: Seccion.InstrumentoArtistaGrupo,
          accion: 'crear',
        },
      ],
    },
    {
      tipo: 'link',
      nombre: 'Canciones',
      routerLink: ['cancion'],
      seccion: Seccion.Cancion,
    },
    {
      tipo: 'link',
      nombre: 'Disquera',
      routerLink: ['disquera'],
      seccion: Seccion.Disquera,
    },
    {
      tipo: 'dropdown',
      nombre: 'Grupo',
      seccion: Seccion.Grupo,
      items: [
        { nombre: 'Lista', routerLink: ['grupo'] },
        {
          nombre: 'Integrantes',
          routerLink: ['artistaGrupo'],
          seccion: Seccion.ArtistaGrupo,
          accion: 'ver',
          divisorAntes: true,
        },
        {
          nombre: 'Agregar Integrante',
          routerLink: ['artistaGrupo/agregar'],
          seccion: Seccion.ArtistaGrupo,
          accion: 'crear',
        },
      ],
    },
    {
      tipo: 'link',
      nombre: 'Instrumento',
      routerLink: ['instrumento'],
      seccion: Seccion.Instrumento,
    },
    {
      tipo: 'link',
      nombre: 'País',
      routerLink: ['pais'],
      seccion: Seccion.Pais,
    },
  ];
  //#endregion Principal

  //#region Auditoria
  navItemsAuditoria: NavItem[] = [
    {
      tipo: 'dropdown',
      nombre: 'Bitácora',
      seccion: Seccion.Bitacora,
      items: [
        { nombre: 'Carga', routerLink: ['bitacoraCarga'] },
        { nombre: 'Error', routerLink: ['bitacoraError'] },
      ],
    },
    {
      tipo: 'link',
      nombre: 'Usuarios',
      routerLink: ['users'],
      seccion: Seccion.Usuarios,
    },
  ];
  //#endregion Auditoria

  //#region Otros Proyectos
  otrosProyectos: NavExternalLinkItem[] = [
    {
      id: 1,
      nombre: 'Repertorio Música',
      url: environment.urlMusica,
    },
    {
      id: 2,
      nombre: 'Repertorio Series',
      url: environment.urlSeries,
    },
    {
      id: 3,
      nombre: 'Repertorio Anime',
      url: environment.urlAnime,
    },
  ];
  //#endregion Otros Proyectos

  user: any;
  rol: any;

  constructor(
    private userService: AuthService,
    public permiso: PermisosService,
    private alerta: AlertasService,
  ) {
    this.user = this.userService.obtenerUsuario();
    this.rol = this.userService.getRolId();
  }

  get otrosProyectosFiltrados() {
    return this.otrosProyectos.filter((x) => x.id !== this.proyecto);
  }

  esLink(item: NavItem): item is NavLinkItem {
    return item.tipo === 'link';
  }

  esDropdown(item: NavItem): item is NavDropdownItem {
    return item.tipo === 'dropdown';
  }

  puedeVerSeccion(seccion?: Seccion): boolean {
    return !seccion || this.permiso.puedeVer(seccion);
  }

  Salir() {
    this.alerta
      .mostrarAlertaConfirmacion(
        '¿Estas seguro de salir de la aplicación?',
        '',
        '¡Salir!',
        'Cancelar',
      )
      .then((confirmed) => {
        if (confirmed) {
          this.userService.logout();
        }
      })
      .catch(() => {
        this.userService.logout();
      });
  }
}
