import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from 'src/app/Services/alertas.service';

import { fechaMayorQueValidator, formatearFechaInput, FuncionesService } from 'src/app/Shared/funciones';
import { Artista } from 'src/app/Models/Artista';
import { ArtistaService } from 'src/app/Services/artista.service';
import { CatalogosService } from 'src/app/Services/catalogos.service';
import { PaisService } from 'src/app/Services/pais.service';

@Component({
  selector: 'app-artista-form',
  templateUrl: './artista-form.component.html',
  styleUrls: ['./artista-form.component.css']
})
export class ArtistaFormComponent implements OnInit {
  form: FormGroup;

  artista: Artista = {
    artistaId: 0,
    nombre: '',
    nombreArtistico: '',
    generoId: 0,
    fechaNacimiento: '',
    fechaFinado: '',
    estatura: '',
    paisId: 0,
    instrumentos: '',
    tipoVozId: 0,
    foto: '',
  }

  edit: boolean = false;
  search: any;

  Generos: any = [];
  TipoVoces: any = [];
  Paises: any = [];

  constructor(
    private service: ArtistaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private alerta: AlertasService,
    public funciones: FuncionesService,

    private catalogo: CatalogosService,
    private paisService: PaisService,
  ) {
    this.form = this.fb.group(
      {
        Nacionalidad: [''],

        Nombre: ['', Validators.required],
        NombreArtistico: ['', Validators.required],
        GeneroId: [
          this.artista.generoId || 0,
          [Validators.required, this.funciones.noCeroValidator()],
        ],
        FechaNacimiento: ['', Validators.required],
        FechaFinado: [],
        Estatura: ['', [Validators.required, Validators.min(1.5)]],
        PaisId: [
          this.artista.paisId || 0,
          [Validators.required, this.funciones.noCeroValidator()],
        ],
        Instrumentos: ['', Validators.required],
        TipoVozId: [
          this.artista.tipoVozId || 0,
          [Validators.required, this.funciones.noCeroValidator()],
        ],
        Foto: [
          this.artista.foto || '',
          [
            Validators.pattern('(https?:\\/\\/.*\\.(?:png|jpg|jpeg|webp))'),
            Validators.required,
          ],
        ],
      },
      { validators: fechaMayorQueValidator('FechaNacimiento', 'FechaFinado') }
    );
  }

  ngOnInit(): void {
    this.obtenerDatos();

    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.service.getById(params['id']).subscribe(
        (res) => {
          this.artista = res;
          this.edit = true;

          this.form.patchValue({
            FechaNacimiento: formatearFechaInput(this.artista.fechaNacimiento!),
            FechaFinado: formatearFechaInput(this.artista.fechaFinado!),
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
    this.obtenerGeneros();
    this.obtenerTiposVoz();
    this.obtenerPaises();
  }

  add() {
    this.artista.fechaFinado = this.artista.fechaFinado || null;
    this.service.create(this.artista).subscribe(
      (res) => {
        this.router.navigate(['..'], { relativeTo: this.activatedRoute });
        this.alerta.successtroast(
          `El artista '${this.artista.nombre}' fue agregado con éxito`,
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
    this.artista.fechaFinado = this.artista.fechaFinado || null;
    const params = this.activatedRoute.snapshot.params;
    this.service.update(params['id'], this.artista).subscribe(
      (res) => {
        this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
        this.alerta.infotroast(
          `El artista '${this.artista.nombre}' fue actualizado con éxito`,
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
  obtenerGeneros() {
    this.catalogo.getGenero().subscribe(
      (res) => {
        this.Generos = res;
      },
      (err) => {
        console.error(err);
        this.alerta.errorServidor();
      }
    );
  }

  obtenerTiposVoz() {
    this.catalogo.getTipoVoz().subscribe(
      (res) => {
        this.TipoVoces = res;
      },
      (err) => {
        console.error(err);
        this.alerta.errorServidor();
      }
    );
  }

  obtenerPaises() {
    this.paisService.getLista().subscribe(
      (res) => {
        this.Paises = res;
      },
      (err) => {
        console.error(err);
        this.alerta.errorServidor();
      }
    );
  }

  getNombreGenero(id: number): string {
    if (!this.Generos || this.Generos.length === 0) return 'Género del Artista';

    const nombre = this.Generos.find((lista: any) => +lista.GeneroId === +id);
    return nombre ? nombre.Genero : 'Género no encontrado';
  }

  getNombreTipoVoz(id: number): string {
    if (!this.TipoVoces || this.TipoVoces.length === 0)
      return 'Tipo de Voz del Artista';

    const nombre = this.TipoVoces.find(
      (lista: any) => +lista.TipoVozId === +id
    );
    return nombre ? nombre.TipoVoz : 'Tipo de Voz no encontrado';
  }

  getNombrePais(id: number): string {
    if (!this.Paises || this.Paises.length === 0) return 'País del Artista';

    const nombre = this.Paises.find((lista: any) => +lista.paisId === +id);
    return nombre
      ? `${nombre.nombre} - ${nombre.nacionalidad}`
      : 'País no encontrado';
  }
  //#endregion Obtener Llaves Foraneas

  //#region Refresh
  refrescarPaises() {
    this.obtenerPaises();
    this.alerta.successtroast('Lista de paises actualizada', 'Actualizado');
  }
  //#endregion Refresh
}
