import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from 'src/app/Services/alertas.service';
import { fechaMayorQueValidator, formatearFechaInput, FuncionesService } from 'src/app/Shared/funciones';
import { NavigationService } from 'src/app/Services/navigation.service';

import { ArtistaGrupo } from 'src/app/Models/ArtistaGrupo';
import { ArtistaGrupoService } from 'src/app/Services/artista-grupo.service';

import { ArtistaService } from 'src/app/Services/artista.service';
import { GrupoService } from 'src/app/Services/grupo.service';

@Component({
  selector: 'app-artista-grupo-form',
  templateUrl: './artista-grupo-form.component.html',
  styleUrls: ['./artista-grupo-form.component.css']
})
export class ArtistaGrupoFormComponent implements OnInit {
  form: FormGroup;

  artistaGrupo: ArtistaGrupo = {
    artistaGrupoId: 0,
    artistaId: 0,
    grupoId: 0,
    fechaInicio: '',
    fechaFin: '',
  };

  edit: boolean = false;
  search: any;
  searchGrupo: any;

  Artistas: any = [];
  Grupo: any = [];

  constructor(
    private service: ArtistaGrupoService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private alerta: AlertasService,
    private funciones: FuncionesService,
    private navigationService: NavigationService,

    private artistaService: ArtistaService,
    private grupoService: GrupoService,
  ) {
    this.form = this.fb.group(
      {
        Grupo: [''],
        Artista: [''],
        ArtistaId: [
          this.artistaGrupo.artistaId || 0,
          [Validators.required, this.funciones.noCeroValidator()],
        ],
        GrupoId: [
          this.artistaGrupo.grupoId || 0,
          [Validators.required, this.funciones.noCeroValidator()],
        ],
        FechaInicio: ['', Validators.required],
        FechaFin: [],
      },
      { validators: fechaMayorQueValidator('FechaInicio', 'FechaFin') }
    );
  }

  ngOnInit(): void {
    this.obtenerDatos();

    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.service.getById(params['id']).subscribe(
        (res) => {
          this.artistaGrupo = res;
          this.edit = true;

          this.form.patchValue({
            FechaInicio: formatearFechaInput(this.artistaGrupo.fechaInicio!),
            FechaFin: formatearFechaInput(this.artistaGrupo.fechaFin!),
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
    this.obtenerArtista();
    this.obtenerGrupo();
  }

  add() {
    this.artistaGrupo.fechaFin = this.artistaGrupo.fechaFin || null;
    this.service.create(this.artistaGrupo).subscribe(
      (res) => {
        this.regresar();
        this.alerta.successtroast(
          'El artista fue agregado con éxito',
          'Artista Agregado',
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
    this.artistaGrupo.fechaFin = this.artistaGrupo.fechaFin || null;
    const params = this.activatedRoute.snapshot.params;
    this.service.update(params['id'], this.artistaGrupo).subscribe(
      (res) => {
        this.regresar();
        this.alerta.infotroast(
          'El artista fue actualizado con éxito',
          'Artista Actualizado',
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
  obtenerArtista() {
    this.artistaService.getLista().subscribe(
      (res) => {
        this.Artistas = res;
      },
      (err) => {
        console.error(err);
        this.alerta.errorServidor();
      }
    );
  }

  obtenerGrupo() {
    this.grupoService.getLista().subscribe(
      (res) => {
        this.Grupo = res;
      },
      (err) => {
        console.error(err);
        this.alerta.errorServidor();
      }
    );
  }

  getNombreArtista(id: number): string {
    if (!this.Artistas || this.Artistas.length === 0) return 'Artistas';

    const nombre = this.Artistas.find(
      (artista: any) => +artista.artistaId === +id
    );
    return nombre ? nombre.nombreArtistico : 'Nombre de Artista no encontrado';
  }

  getNombreGrupo(id: number): string {
    if (!this.Grupo || this.Grupo.length === 0) return 'Grupo';

    const nombre = this.Grupo.find((grupo: any) => +grupo.grupoId === +id);
    return nombre ? nombre.nombre : 'Nombre de Grupo no encontrado';
  }

  getImgGrupo(id: number): string {
    if (!this.Grupo || this.Grupo.length === 0) return 'Grupo';

    const nombre = this.Grupo.find((grupo: any) => +grupo.grupoId === +id);
    return nombre ? nombre.logo : 'Logo de Grupo no encontrado';
  }
  //#endregion Obtener Llaves Foraneas

  //#region Refresh
  refrescarArtistas() {
    this.obtenerArtista();
    this.alerta.successtroast('Lista de artistas actualizada', 'Actualizado');
  }

  refrescarGrupos() {
    this.obtenerGrupo();
    this.alerta.successtroast('Lista de grupos actualizada', 'Actualizado');
  }
  //#endregion Refresh

  regresar() {
    this.navigationService.goBack();
  }
}
