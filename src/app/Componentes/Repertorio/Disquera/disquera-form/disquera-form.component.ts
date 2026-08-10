import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from 'src/app/Services/alertas.service';
import { fechaMayorQueValidator, formatearFechaInput, FuncionesService } from 'src/app/Shared/funciones';

import { Disquera } from 'src/app/Models/Disquera';
import { DisqueraService } from 'src/app/Services/disquera.service';

import { CatalogosService } from 'src/app/Services/catalogos.service';
import { PaisService } from 'src/app/Services/pais.service';

@Component({
  selector: 'app-disquera-form',
  templateUrl: './disquera-form.component.html',
  styleUrls: ['./disquera-form.component.css']
})
export class DisqueraFormComponent implements OnInit {
  form: FormGroup;

  disquera: Disquera = {
    disqueraId: 0,
    nombre: '',
    fundacion: '',
    fundador: '',
    generos: '',
    paisId: 0,
    estatusId: 1,
    logo: '',
  }

  edit: boolean = false;
  search: any;

  Paises: any = [];
  Estatus: any = [];

  constructor(
    private service: DisqueraService,
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
        Pais: [''],

        Nombre: ['', Validators.required],
        Fundacion: ['', Validators.required],
        Fundador: ['', Validators.required],
        Generos: ['', Validators.required],
        PaisId: [
          this.disquera.paisId || 0,
          [Validators.required, this.funciones.noCeroValidator()],
        ],
        EstatusId: [
          this.disquera.estatusId || 0,
          [Validators.required, this.funciones.noCeroValidator()],
        ],
        Logo: [this.disquera.logo || '',
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
          this.disquera = res; //Muestra en el navegador
          this.edit = true; //Asignamos que es verdadero

          this.form.patchValue({
            Fundacion: formatearFechaInput(this.disquera.fundacion!),
          });
        },
        (err) => {
          this.alerta.errorServidor();
        }
      );
    }
  }

  obtenerDatos() {
    this.obtenerEstatus();
    this.obtenerPaises();
  }

  add() {
    this.service.create(this.disquera).subscribe(
      (res) => {
        this.router.navigate(['..'], { relativeTo: this.activatedRoute });
        this.alerta.successtroast(
          `La disquera '${this.disquera.nombre}' fue agregada con éxito`,
          'Disquera Agregada'
        );
      },
      (err) => {
        const msg = err.error?.message || 'Error al Registrar';
        if (err.status === 400 || err.status === 401) {
          this.alerta.warning(msg, 'Error al Registrar');
        } else {
          this.alerta.errorServidor();
        }
      }
    );
  }

  actualiza() {
    const params = this.activatedRoute.snapshot.params;
    this.service.update(params['id'], this.disquera).subscribe(
      (res) => {
        this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
        this.alerta.infotroast(
          `La disquera '${this.disquera.nombre}' fue actualizada con éxito`,
          'Disquera Actualizada'
        );
      },
      (err) => {
        const msg = err.error?.message || 'Error al Registrar';
        if (err.status === 400 || err.status === 401) {
          this.alerta.warning(msg, 'Error al Registrar');
        } else {
          this.alerta.errorServidor();
        }
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

  getNombreEstatus(id: number): string {
    if (!this.Estatus || this.Estatus.length === 0) return 'Estado del Grupo';

    const nombre = this.Estatus.find(
      (estatus: any) => +estatus.EstatusId === +id
    );
    return nombre ? nombre.Estatus : 'Nombre de Estatus no encontrado';
  }

  getNombrePais(id: number): string {
    if (!this.Paises || this.Paises.length === 0) return 'País del Artista';

    const nombre = this.Paises.find((lista: any) => +lista.paisId === +id);
    return nombre
      ? `${nombre.nombre}`
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
