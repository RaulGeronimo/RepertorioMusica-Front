import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from 'src/app/Services/alertas.service';
import { fechaMayorQueValidator, formatearFechaInput, FuncionesService } from 'src/app/Shared/funciones';
import { NavigationService } from 'src/app/Services/navigation.service';

import { Grupo } from 'src/app/Models/Grupo';
import { GrupoService } from 'src/app/Services/grupo.service';

import { CatalogosService } from 'src/app/Services/catalogos.service';

@Component({
  selector: 'app-grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.css']
})
export class GrupoFormComponent implements OnInit {
  form: FormGroup;

  grupo: Grupo = {
    grupoId: 0,
    nombre: '',
    origen: '',
    genero: '',
    inicio: '',
    fin: '',
    sellos: '',
    estatusId: 1,
    sitioWeb: '',
    idiomaId: 5,
    logo: '',
  }

  edit: boolean = false;

  Estatus: any = [];
  Idiomas: any = [];

  constructor(
    private service: GrupoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private alerta: AlertasService,
    public funciones: FuncionesService,
    private navigationService: NavigationService,

    private catalogo: CatalogosService,
  ) {
    this.form = this.fb.group(
      {
        Nombre: ['', Validators.required],
        Origen: ['', Validators.required],
        Genero: ['', Validators.required],
        Inicio: ['', Validators.required],
        Fin: [],
        Sellos: ['', Validators.required],
        EstatusId: [
          this.grupo.estatusId || 0,
          [Validators.required, this.funciones.noCeroValidator()],
        ],
        SitioWeb: [
          '',
          [Validators.pattern('https?://.*'), Validators.required],
        ],
        IdiomaId: [
          this.grupo.idiomaId || 0,
          [Validators.required, this.funciones.noCeroValidator()],
        ],
        Logo: [this.grupo.logo || '',
        [
          Validators.pattern('(https?:\\/\\/.*\\.(?:png|jpg|jpeg|webp))'),
          Validators.required,
        ],],
      },
      { validators: fechaMayorQueValidator('Inicio', 'Fin') }
    );
  }

  ngOnInit(): void {
    this.obtenerDatos();
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.service.getById(params['id']).subscribe(
        (res) => {
          this.grupo = res; //Muestra en el navegador
          this.edit = true; //Asignamos que es verdadero

          this.form.patchValue({
            Inicio: formatearFechaInput(this.grupo.inicio!),
            Fin: formatearFechaInput(this.grupo.fin!),
          });
        },
        (err) => {
          console.error(err);
          this.alerta.errorServidor();
        }
      );
    }
  }

  obtenerDatos() {
    this.obtenerEstatus();
    this.obtenerIdioma();
  }

  add() {
    this.grupo.fin = this.grupo.fin || null;
    this.service.create(this.grupo).subscribe(
      (res) => {
        this.router.navigate(['..'], { relativeTo: this.activatedRoute });
        this.alerta.successtroast(
          `El grupo '${this.grupo.nombre}' fue agregado con éxito`,
          'Grupo Agregado'
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
      }
    );
  }

  actualiza() {
    this.grupo.fin = this.grupo.fin || null;
    const params = this.activatedRoute.snapshot.params;
    this.service.update(params['id'], this.grupo).subscribe(
      (res) => {
        this.regresar()
        this.alerta.infotroast(
          `El grupo '${this.grupo.nombre}' fue actualizado con éxito`,
          'Grupo Actualizado'
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
      }
    );
  }

  //#region Obtener Llaves Foraneas
  obtenerEstatus() {
    this.catalogo.getEstatus().subscribe(
      (res) => {
        this.Estatus = res;
      },
      (err) => {
        console.error(err);
        this.alerta.errorServidor();
      }
    );
  }

  obtenerIdioma() {
    this.catalogo.getIdioma().subscribe(
      (res) => {
        this.Idiomas = res;
      },
      (err) => {
        console.error(err);
        this.alerta.errorServidor();
      }
    );
  }

  getNombreEstatus(id: number): string {
    if (!this.Estatus || this.Estatus.length === 0) return 'Estado del Grupo';

    const nombre = this.Estatus.find(
      (estatus: any) => +estatus.EstatusId === +id
    );
    return nombre ? nombre.Estatus : 'Nombre de Estatus no encontrado';
  }

  getNombreIdioma(id: number): string {
    if (!this.Idiomas || this.Idiomas.length === 0) return 'Idioma';

    const idioma = this.Idiomas.find((item: any) => +item.IdiomaId === +id);
    return idioma ? idioma.Idioma : 'Idioma no encontrado';
  }
  //#endregion Obtener Llaves Foraneas

  regresar() {
    this.navigationService.goBack();
  }
}
