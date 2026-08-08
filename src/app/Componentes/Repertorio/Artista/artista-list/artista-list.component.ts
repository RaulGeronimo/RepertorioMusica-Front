import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertasService } from 'src/app/Services/alertas.service';
import { FuncionesService } from 'src/app/Shared/funciones';
import { PermisosService } from 'src/app/Services/permisos.service';
import { environment } from 'src/environments/environment';
import { Seccion } from 'src/app/enum/seccion.enum';

import { ArtistaService } from 'src/app/Services/artista.service';

@Component({
  selector: 'app-artista-list',
  templateUrl: './artista-list.component.html',
  styleUrls: ['./artista-list.component.css']
})
export class ArtistaListComponent implements OnInit, AfterViewInit {
  pageSize: number = environment.registrosPagina;
  Archivo: string = 'Artistas';
  displayedColumns: string[] = [
    'artistaId',
    'nombre',
    'nombreArtistico',
    'genero',
    'fechaNacimiento',
    'fechaFinado',
    'edad',
    'estatura',
    'pais',
    'instrumentos',
    'tipoVoz',
    'acciones',
  ];

  dataSource = new MatTableDataSource<any>();
  total: number = 0;

  Artistas: any = [];
  search: any;
  show: boolean = !true;
  tabla: boolean = true;

  //#region Permisos
  Seccion = Seccion;
  //#endregion Permisos

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: ArtistaService,
    private alerta: AlertasService,
    public permiso: PermisosService,
    public funciones: FuncionesService,
  ) { }

  ngOnInit(): void {
    this.obtenerDatos();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  obtenerDatos() {
    this.obtenerLista();
  }

  borrar(id: number) {
    this.alerta.borrarArtista(id, () => this.obtenerLista());
  }

  obtenerLista() {
    this.service.getLista().subscribe(
      (res: any[]) => {
        if (res != null) {
          this.Artistas = res;
          this.dataSource.data = res;
          this.total = res.length > 0 ? res[0].totalRegistros : 0;
        } else {
          this.Artistas = [];
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
    this.funciones.exportarExcel(this.Artistas, this.Archivo);
  }
}
