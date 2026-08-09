import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from 'src/app/Services/alertas.service';
import { formatearFechaInput, FuncionesService } from 'src/app/Shared/funciones';
import { NavigationService } from 'src/app/Services/navigation.service';

import { Cancion } from 'src/app/Models/Cancion';
import { CancionService } from 'src/app/Services/cancion.service';

import { CatalogosService } from 'src/app/Services/catalogos.service';
import { GrupoService } from 'src/app/Services/grupo.service';

@Component({
  selector: 'app-canciones-form',
  templateUrl: './canciones-form.component.html',
  styleUrls: ['./canciones-form.component.css']
})
export class CancionesFormComponent implements OnInit {
  form: FormGroup;

  cancion: Cancion = {
    cancionId: 0,
    nombre: '',
    duracion: '',
    publicacion: '',
    genero: '',
    interpretacionId: 3,
    grupoId: 0,
  };

  edit: boolean = false;
  search: any;

  Grupos: any = [];
  Interpretaciones: any = [];

  constructor(
    private service: CancionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private alerta: AlertasService,
    public funciones: FuncionesService,

    private grupoService: GrupoService,
    private catalogo: CatalogosService,
    private navigationService: NavigationService
  ) {
    this.form = this.fb.group({
      Grupo: [''],

      Nombre: ['', Validators.required],
      Duracion: ['', Validators.required],
      Publicacion: ['', Validators.required],
      Genero: ['', Validators.required],
      InterpretacionId: [
        this.cancion.interpretacionId || 0,
        [Validators.required, this.funciones.noCeroValidator()],
      ],
      GrupoId: [
        this.cancion.grupoId || 0,
        [Validators.required, this.funciones.noCeroValidator()],
      ],
    });
  }

  ngOnInit(): void {
    this.obtenerDatos();

    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.service.getById(params['id']).subscribe(
        (res) => {
          this.cancion = res;
          this.edit = true;

          this.form.patchValue({
            Publicacion: formatearFechaInput(this.cancion.publicacion!),
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
    this.obtenerInterpretacion();
  }

  add() {
    this.service.create(this.cancion).subscribe(
      (res) => {
        this.regresar();
        this.alerta.successtroast(
          `La canción '${this.cancion.nombre}' fue agregada con éxito`,
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
    this.service.update(params['id'], this.cancion).subscribe(
      (res) => {
        this.regresar();
        this.alerta.infotroast(
          `La canción '${this.cancion.nombre}' fue actualizada con éxito`,
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

  obtenerInterpretacion() {
    this.catalogo.getInterpretacion().subscribe(
      (res) => {
        this.Interpretaciones = res;
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

  getNombreInterpretacion(id: number): string {
    if (!this.Interpretaciones || this.Interpretaciones.length === 0)
      return 'Interpretacion';

    const interpretacion = this.Interpretaciones.find(
      (item: any) => +item.InterpretacionId === +id
    );
    return interpretacion
      ? interpretacion.Interpretacion
      : 'Interpretacion no encontrada';
  }
  //#endregion Obtener Llaves Foraneas

  //#region Refresh
  refrescarGrupos() {
    this.obtenerGrupo();
    this.alerta.successtroast('Lista de grupos actualizada', 'Actualizado');
  }
  //#endregion Refresh

  regresar() {
    this.navigationService.goBack();
  }
}
