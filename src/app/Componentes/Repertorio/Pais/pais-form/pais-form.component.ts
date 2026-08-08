import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from 'src/app/Services/alertas.service';
import { FuncionesService } from 'src/app/Shared/funciones';

import { Pais } from 'src/app/Models/Pais';
import { PaisService } from 'src/app/Services/pais.service';

import { CatalogosService } from 'src/app/Services/catalogos.service';

@Component({
  selector: 'app-pais-form',
  templateUrl: './pais-form.component.html',
  styleUrls: ['./pais-form.component.css']
})
export class PaisFormComponent implements OnInit {
  form: FormGroup;

  pais: Pais = {
    paisId: 0,
    nombre: '',
    nacionalidad: '',
    continenteId: 0,
    bandera: '',
  }

  edit: boolean = false;
  Continentes: any = [];

  constructor(
    private service: PaisService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private alerta: AlertasService,
    public funciones: FuncionesService,
    private catalogo: CatalogosService,
  ) {
    this.form = this.fb.group({
      Nombre: ['', Validators.required],
      Nacionalidad: ['', Validators.required],
      ContinenteId: [
        this.pais.continenteId || 0,
        [Validators.required, this.funciones.noCeroValidator()],
      ],
      Bandera: [
        '',
        [
          Validators.pattern('(https?:\\/\\/.*\\.(?:png|jpg|jpeg|webp))'),
          Validators.required,
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
          this.pais = res; //Muestra en el navegador
          this.edit = true; //Asignamos que es verdadero
        },
        (err) => {
          this.alerta.errorServidor();
        },
      );
    }
  }

  obtenerDatos() {
    this.obtenerContinente();
  }

  add() {
    this.service.create(this.pais).subscribe(
      (res) => {
        this.router.navigate(['..'], { relativeTo: this.activatedRoute });
        this.alerta.successtroast(
          `El país '${this.pais.nombre}' fue agregado con éxito`,
          'País Agregado',
        );
      },
      (err) => {
        const msg = err.error?.message || 'Error al Registrar';
        if (err.status === 400 || err.status === 401) {
          this.alerta.warning(msg, 'Error al Registrar');
        } else {
          this.alerta.errorServidor();
        }
      },
    );
  }

  actualiza() {
    const params = this.activatedRoute.snapshot.params;
    this.service.update(params['id'], this.pais).subscribe(
      (res) => {
        this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
        this.alerta.infotroast(
          `El país '${this.pais.nombre}' fue actualizado con éxito`,
          'País Actualizado',
        );
      },
      (err) => {
        const msg = err.error?.message || 'Error al Registrar';
        if (err.status === 400 || err.status === 401) {
          this.alerta.warning(msg, 'Error al Registrar');
        } else {
          this.alerta.errorServidor();
        }
      },
    );
  }

  //#region Obtener Llaves Foraneas
  obtenerContinente() {
    this.catalogo.getContinente().subscribe(
      (res) => {
        this.Continentes = res;
      },
      (err) => {
        console.error(err);
        this.alerta.errorServidor();
      }
    );
  }

  getNombreContinentes(id: number): string {
    if (!this.Continentes || this.Continentes.length === 0)
      return 'Continente del País';

    const nombre = this.Continentes.find(
      (buscar: any) => +buscar.ContinenteId === +id
    );
    return nombre ? nombre.Continente : 'Nombre de Continente no encontrado';
  }
  //#endregion Obtener Llaves Foraneas
}
