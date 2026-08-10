import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from 'src/app/Services/alertas.service';
import { fechaMayorQueValidator, formatearFechaInput, FuncionesService } from 'src/app/Shared/funciones';
import { NavigationService } from 'src/app/Services/navigation.service';

import { InstrumentoArtistaGrupo } from 'src/app/Models/InstrumentoArtista';
import { InstrumentoArtistaGrupoService } from 'src/app/Services/instrumento-artista-grupo.service';

import { ArtistaGrupoService } from 'src/app/Services/artista-grupo.service';
import { InstrumentoService } from 'src/app/Services/instrumento.service';

@Component({
  selector: 'app-instrumento-artista-form',
  templateUrl: './instrumento-artista-form.component.html',
  styleUrls: ['./instrumento-artista-form.component.css']
})
export class InstrumentoArtistaFormComponent implements OnInit {
  form: FormGroup;

  artistaGrupo: InstrumentoArtistaGrupo = {
    instrumentoArtistaGrupoId: 0,
    artistaId: 0,
    instrumentoId: 0,
  };

  edit: boolean = false;
  search: any;

  Artistas: any = [];
  Instrumentos: any = [];

  constructor(
    private service: InstrumentoArtistaGrupoService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private alerta: AlertasService,
    private funciones: FuncionesService,
    private navigationService: NavigationService,

    private artistaService: ArtistaGrupoService,
    private instrumentoService: InstrumentoService,
  ) {
    this.form = this.fb.group({
      Artista: [''],
      ArtistaId: [
        this.artistaGrupo.artistaId || 0,
        [Validators.required, this.funciones.noCeroValidator()],
      ],
      InstrumentoId: [
        this.artistaGrupo.instrumentoId || 0,
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
          this.artistaGrupo = res;
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
    this.obtenerArtista();
    this.obtenerInstrumento();
  }

  add() {
    this.service.create(this.artistaGrupo).subscribe(
      (res) => {
        this.regresar();
        this.alerta.successtroast(
          'El instrumento fue agregado con éxito',
          'Instrumento Agregado',
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
    this.service.update(params['id'], this.artistaGrupo).subscribe(
      (res) => {
        this.regresar();
        this.alerta.infotroast(
          'El instrumento fue actualizado con éxito',
          'Instrumento Actualizado',
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

  obtenerInstrumento() {
    this.instrumentoService.getLista().subscribe(
      (res) => {
        this.Instrumentos = res;
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
      (artista: any) => +artista.artistaGrupoId === +id
    );
    return nombre ? nombre.nombreArtistico : 'Nombre de Artista no encontrado';
  }

  getNombreInstrumento(id: number): string {
    if (!this.Instrumentos || this.Instrumentos.length === 0)
      return 'Instrumento';

    const nombre = this.Instrumentos.find(
      (instrumento: any) => +instrumento.instrumentoId === +id
    );
    return nombre ? nombre.nombre : 'Nombre de Instrumento no encontrado';
  }

  getImgArtista(id: number): string {
    if (!this.Artistas || this.Artistas.length === 0) return 'Artistas';

    const nombre = this.Artistas.find(
      (artista: any) => +artista.artistaGrupoId === +id
    );
    return nombre ? nombre.foto : 'Foto del Artista no encontrado';
  }
  //#endregion Obtener Llaves Foraneas

  //#region Refresh
  refrescarArtistas() {
    this.obtenerArtista();
    this.alerta.successtroast('Lista de artistas actualizada', 'Actualizado');
  }

  refrescarInstrumentos() {
    this.obtenerInstrumento();
    this.alerta.successtroast('Lista de instrumentos actualizada', 'Actualizado');
  }

  getNombreGrupo(id: number): string {
    if (!this.Artistas || this.Artistas.length === 0) return 'Grupo';

    const nombre = this.Artistas.find(
      (artista: any) => +artista.artistaGrupoId === +id
    );
    return nombre ? nombre.grupo : 'Nombre del Grupo no encontrado';
  }
  //#endregion Refresh

  regresar() {
    this.navigationService.goBack();
  }
}
