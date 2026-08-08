import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from 'src/app/Services/alertas.service';
import { FuncionesService } from 'src/app/Shared/funciones';

import { Instrumento } from 'src/app/Models/Instrumento';
import { InstrumentoService } from 'src/app/Services/instrumento.service';

@Component({
  selector: 'app-instrumento-form',
  templateUrl: './instrumento-form.component.html',
  styleUrls: ['./instrumento-form.component.css']
})
export class InstrumentoFormComponent implements OnInit {
form: FormGroup;

  instrumento: Instrumento = {
    instrumentoId: 0,
    nombre: '',
    descripcion: '',
    foto: '',
  }

  edit: boolean = false;
  Continentes: any = [];

  constructor(
    private service: InstrumentoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private alerta: AlertasService,
    public funciones: FuncionesService,
  ) {
    this.form = this.fb.group({
      Nombre: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Foto: [
        this.instrumento.foto || '',
        [
          Validators.pattern('(https?:\\/\\/.*\\.(?:png|jpg|jpeg|webp))'),
          Validators.required,
        ],
      ],
    });
  }

  ngOnInit(): void {

    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.service.getById(params['id']).subscribe(
        (res) => {
          this.instrumento = res; //Muestra en el navegador
          this.edit = true; //Asignamos que es verdadero
        },
        (err) => {
          this.alerta.errorServidor();
        },
      );
    }
  }

  add() {
    this.service.create(this.instrumento).subscribe(
      (res) => {
        this.router.navigate(['..'], { relativeTo: this.activatedRoute });
        this.alerta.successtroast(
          `El instrumento '${this.instrumento.nombre}' fue agregado con éxito`,
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
      },
    );
  }

  actualiza() {
    const params = this.activatedRoute.snapshot.params;
    this.service.update(params['id'], this.instrumento).subscribe(
      (res) => {
        this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
        this.alerta.infotroast(
          `El instrumento '${this.instrumento.nombre}' fue actualizado con éxito`,
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
      },
    );
  }
}
