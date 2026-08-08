import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from 'src/app/Services/alertas.service';
import { formatearFechaInput, FuncionesService } from 'src/app/Shared/funciones';
import { NavigationService } from 'src/app/Services/navigation.service';

import { Album } from 'src/app/Models/Album';
import { AlbumService } from 'src/app/Services/album.service';

import { GrupoService } from 'src/app/Services/grupo.service';
import { DisqueraService } from 'src/app/Services/disquera.service';

@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.css']
})
export class AlbumFormComponent implements OnInit {
  form: FormGroup;

  album: Album = {
    albumId: 0,
    nombre: '',
    grupoId: 0,
    disqueraId: 0,
    duracion: '',
    lanzamiento: '',
    grabacion: '',
    portada: '',
  };

  edit: boolean = false;
  search: any;
  searchDisquera: any;

  Grupos: any = [];
  Disqueras: any = [];

  constructor(
    private service: AlbumService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private alerta: AlertasService,
    public funciones: FuncionesService,
    private navigationService: NavigationService,

    private grupoService: GrupoService,
    private disqueraService: DisqueraService,
  ) {
    this.form = this.fb.group({
      Grupo: [''],
      Disquera: [''],

      GrupoId: [
        this.album.grupoId || 0,
        [Validators.required, this.funciones.noCeroValidator()],
      ],
      DisqueraId: [
        this.album.disqueraId || 0,
        [Validators.required, this.funciones.noCeroValidator()],
      ],
      Nombre: ['', Validators.required],
      Duracion: ['', Validators.required],
      Lanzamiento: ['', Validators.required],
      Grabacion: ['', Validators.required],
      Portada: ['', [
        Validators.pattern('(https?:\\/\\/.*\\.(?:png|jpg|jpeg|webp))'),
        Validators.required,
      ]],
    });
  }

  ngOnInit(): void {
    this.obtenerDatos();

    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.service.getById(params['id']).subscribe(
        (res) => {
          this.album = res;
          this.edit = true;

          this.form.patchValue({
            Lanzamiento: formatearFechaInput(this.album.lanzamiento!),
          });
        },
        (err) => {
          console.error(err);
          this.alerta.errorServidor();
        },
      );
    }
  }

  obtenerDatos() {
    this.obtenerGrupo();
    this.obtenerDisquera();
  }

  add() {
    this.service.create(this.album).subscribe(
      (res) => {
        this.regresar();
        this.alerta.successtroast(
          `El álbum '${this.album.nombre}' fue agregado con éxito`,
          'Álbum Agregado',
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
    this.service.update(params['id'], this.album).subscribe(
      (res) => {
        this.regresar();
        this.alerta.infotroast(
          `El álbum '${this.album.nombre}' fue actualizado con éxito`,
          'Álbum Actualizado',
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
  obtenerGrupo() {
    this.grupoService.getLista().subscribe(
      (res) => {
        this.Grupos = res;
      },
      (err) => {
        console.error(err);
        this.alerta.errorServidor();
      }
    );
  }

  obtenerDisquera() {
    this.disqueraService.getLista().subscribe(
      (res) => {
        this.Disqueras = res;
      },
      (err) => {
        console.error(err);
        this.alerta.errorServidor();
      }
    );
  }

  getNombreGrupo(id: number): string {
    if (!this.Grupos || this.Grupos.length === 0) return 'Grupo';

    const nombre = this.Grupos.find((grupo: any) => +grupo.grupoId === +id);
    return nombre ? nombre.nombre : 'Nombre de Grupo no encontrado';
  }

  getNombreDisquera(id: number): string {
    if (!this.Disqueras || this.Disqueras.length === 0) return 'Disquera';

    const disquera = this.Disqueras.find(
      (item: any) => +item.disqueraId === +id
    );
    return disquera ? disquera.nombre : 'Disquera no encontrado';
  }
  //#endregion Obtener Llaves Foraneas

  //#region Refresh
  refrescarGrupos() {
    this.obtenerGrupo();
    this.alerta.successtroast('Lista de grupos actualizada', 'Actualizado');
  }

  refrescarDisqueras() {
    this.obtenerDisquera();
    this.alerta.successtroast('Lista de disqueras actualizada', 'Actualizado');
  }
  //#endregion Refresh

  regresar() {
    this.navigationService.goBack();
  }
}
