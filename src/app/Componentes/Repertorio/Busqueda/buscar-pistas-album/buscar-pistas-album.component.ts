import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertasService } from 'src/app/Services/alertas.service';
import { FuncionesService } from 'src/app/Shared/funciones';
import { PermisosService } from 'src/app/Services/permisos.service';
import { NavigationService } from 'src/app/Services/navigation.service';
import { environment } from 'src/environments/environment';
import { Seccion } from 'src/app/enum/seccion.enum';

import { BusquedaService } from 'src/app/Services/busqueda.service';

@Component({
  selector: 'app-buscar-pistas-album',
  templateUrl: './buscar-pistas-album.component.html',
  styleUrls: ['./buscar-pistas-album.component.css']
})
export class BuscarPistasAlbumComponent implements OnInit, AfterViewInit {
  pageSize: number = environment.registrosPagina;
  Archivo: string = 'Canciones';
  displayedColumns: string[] = [
    'numero',
    'nombre',
    'duracion',
    'publicacion',
    'genero',
  ];

  dataSource = new MatTableDataSource<any>();
  total: number = 0;

  Album: any = [];
  Canciones: any = [];

  search: any;
  show: boolean = !true;
  tabla: boolean = true;

  //#region Permisos
  Seccion = Seccion;
  //#endregion Permisos

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: BusquedaService,
    private activatedRoute: ActivatedRoute,
    private alerta: AlertasService,
    public permiso: PermisosService,
    public funciones: FuncionesService,
    private navigationService: NavigationService,
  ) { }

  ngOnInit(): void {
    this.obtenerDatos();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  obtenerDatos() {
    this.obtenerAlbum();
    this.obtenerLista();
  }

  borrar(id: number) {
    this.alerta.borrarCancion(id, () => this.obtenerLista());
  }

  obtenerAlbum() {
    const params = this.activatedRoute.snapshot.params;
    this.service.getAlbumId(params['id']).subscribe(
      (res: any[]) => {
        this.Album = res;
        this.alerta.successtroast(
          `Canciones del álbum '${this.Album.nombre}'`,
          'Lista de Canciones'
        );
      },
      (err) => {
        console.error(err);
        this.alerta.errorServidor();
      },
    );
  }

  obtenerLista() {
    const params = this.activatedRoute.snapshot.params;
    this.service.getAlbumCanciones(params['id']).subscribe(
      (res: any[]) => {
        if (res != null) {
          this.Canciones = res;
          this.dataSource.data = res;
          this.total = res.length > 0 ? res[0].totalRegistros : 0;
        } else {
          this.Canciones = [];
          this.alerta.SinResultados();
        }
      },
      (err) => {
        console.error(err);
        this.alerta.errorServidor();
      },
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cambiarVista() {
    this.tabla = !this.tabla;

    if (this.tabla) {
      this.search = '';
    } else {
      this.dataSource.filter = '';
    }
  }

  export() {
    this.alerta.reporte(this.Archivo);
    this.funciones.exportarExcel(this.Canciones, this.Archivo);
  }

  regresar() {
    this.navigationService.goBack();
  }
}
