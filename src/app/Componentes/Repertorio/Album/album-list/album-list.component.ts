import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertasService } from 'src/app/Services/alertas.service';
import { FuncionesService } from 'src/app/Shared/funciones';
import { PermisosService } from 'src/app/Services/permisos.service';
import { environment } from 'src/environments/environment';
import { Seccion } from 'src/app/enum/seccion.enum';

import { AlbumService } from 'src/app/Services/album.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit, AfterViewInit {
  pageSize: number = environment.registrosPagina;
  Archivo: string = 'Albumes';
  displayedColumns: string[] = [
    'albumId',
    'nombre',
    'grupo',
    'disquera',
    'canciones',
    'duracion',
    'lanzamiento',
    'grabacion',
    'acciones',
  ];

  dataSource = new MatTableDataSource<any>();
  total: number = 0;

  Albumes: any = [];
  search: any;
  show: boolean = !true;
  tabla: boolean = true;

  //#region Permisos
  Seccion = Seccion;
  //#endregion Permisos

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: AlbumService,
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
    this.alerta.borrarAlbum(id, () => this.obtenerLista());
  }

  obtenerLista() {
    this.service.getLista().subscribe(
      (res: any[]) => {
        if (res != null) {
          this.Albumes = res;
          this.dataSource.data = res;
          this.total = res.length > 0 ? res[0].totalRegistros : 0;
        } else {
          this.Albumes = [];
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
    this.funciones.exportarExcel(this.Albumes, this.Archivo);
  }
}
