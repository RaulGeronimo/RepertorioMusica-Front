import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from 'src/app/Services/alertas.service';
import { formatearFechaInput, FuncionesService } from 'src/app/Shared/funciones';
import { NavigationService } from 'src/app/Services/navigation.service';

import { CancionAlbum } from 'src/app/Models/CancionAlbum';
import { CancionAlbumService } from 'src/app/Services/cancion-album.service';

import { CancionService } from 'src/app/Services/cancion.service';
import { AlbumService } from 'src/app/Services/album.service';

@Component({
  selector: 'app-canciones-album-form',
  templateUrl: './canciones-album-form.component.html',
  styleUrls: ['./canciones-album-form.component.css']
})
export class CancionesAlbumFormComponent implements OnInit {
  form: FormGroup;

  cancionAlbum: CancionAlbum = {
    cancionAlbumId: 0,
    cancionId: 0,
    albumId: 0,
    numero: 0,
  };

  edit: boolean = false;
  search: any;

  Canciones: any = [];
  Albumes: any = [];

  constructor(
    private service: CancionAlbumService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private alerta: AlertasService,
    private funciones: FuncionesService,
    private navigationService: NavigationService,

    private cancionService: CancionService,
    private albumService: AlbumService,
  ) {
    this.form = this.fb.group({
      Grupo: [''],
      CancionId: [
        this.cancionAlbum.cancionId || 0,
        [Validators.required, this.funciones.noCeroValidator()],
      ],
      AlbumId: [
        this.cancionAlbum.albumId || 0,
        [Validators.required, this.funciones.noCeroValidator()],
      ],
      Numero: [
        this.cancionAlbum.numero || 0,
        [
          Validators.required,
          this.funciones.noCeroValidator(),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.obtenerDatos();

    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.service.getById(params['id']).subscribe(
        (res) => {
          this.cancionAlbum = res;
          this.edit = true;
        },
        (err) => {
          console.error(err);
          this.alerta.errorServidor();
        },
      );
    }
  }

  obtenerDatos() {
    this.obtenerCancion();
    this.obtenerAlbum();
  }

  add() {
    this.service.create(this.cancionAlbum).subscribe(
      (res) => {
        this.regresar();
        this.alerta.successtroast(
          'La canción fue agregada con éxito',
          'Canción Agregada',
        );
      },
      (err) => {
        const msg = err.error?.message || 'Error al Registrar';
        if (err.status === 400 || err.status === 401) {
          this.alerta.warning(msg, 'Error al Registrar');
        } else {
          this.alerta.errorServidor();
        }
        console.error(err);
      },
    );
  }

  actualiza() {
    const params = this.activatedRoute.snapshot.params;
    this.service.update(params['id'], this.cancionAlbum).subscribe(
      (res) => {
        this.regresar();
        this.alerta.infotroast(
          'La canción fue actualizada con éxito',
          'Canción Actualizada',
        );
      },
      (err) => {
        const msg = err.error?.message || 'Error al Registrar';
        if (err.status === 400 || err.status === 401) {
          this.alerta.warning(msg, 'Error al Registrar');
        } else {
          this.alerta.errorServidor();
        }
        console.error(err);
      },
    );
  }

  //#region Obtener Llaves Foraneas
  obtenerCancion() {
    this.cancionService.getLista().subscribe(
      (res) => {
        this.Canciones = res;
      },
      (err) => {
        console.error(err);
        this.alerta.errorServidor();
      }
    );
  }

  obtenerAlbum() {
    this.albumService.getLista().subscribe(
      (res) => {
        this.Albumes = res;
      },
      (err) => {
        console.error(err);
        this.alerta.errorServidor();
      }
    );
  }

  getNombreCancion(id: number): string {
    if (!this.Canciones || this.Canciones.length === 0) return 'Canciones';

    const nombre = this.Canciones.find(
      (cancion: any) => +cancion.cancionId === +id
    );
    return nombre ? nombre.nombre : 'Nombre de la Canción no encontrada';
  }

  getNombreAlbum(id: number): string {
    if (!this.Albumes || this.Albumes.length === 0) return 'Album';

    const nombre = this.Albumes.find((album: any) => +album.albumId === +id);
    return nombre ? nombre.nombre : 'Nombre del Álbum no encontrado';
  }

  getImgAlbum(id: number): string {
    if (!this.Albumes || this.Albumes.length === 0) return 'Album';

    const portada = this.Albumes.find((album: any) => +album.albumId === +id);
    return portada ? portada.portada : 'Portada del Álbum no encontrada';
  }
  //#endregion Obtener Llaves Foraneas

  //#region Refresh
  refrescarCanciones() {
    this.obtenerCancion();
    this.alerta.successtroast('Lista de canciones actualizada', 'Actualizado');
  }

  refrescarAlbumes() {
    this.obtenerAlbum();
    this.alerta.successtroast('Lista de álbumes actualizada', 'Actualizado');
  }
  //#endregion Refresh

  regresar() {
    this.navigationService.goBack();
  }
}
