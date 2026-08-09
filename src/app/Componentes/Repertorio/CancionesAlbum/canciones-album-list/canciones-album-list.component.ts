import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertasService } from 'src/app/Services/alertas.service';
import { FuncionesService } from 'src/app/Shared/funciones';
import { PermisosService } from 'src/app/Services/permisos.service';
import { environment } from 'src/environments/environment';
import { Seccion } from 'src/app/enum/seccion.enum';

import { CancionAlbumService } from 'src/app/Services/cancion-album.service';

@Component({
  selector: 'app-canciones-album-list',
  templateUrl: './canciones-album-list.component.html',
  styleUrls: ['./canciones-album-list.component.css']
})
export class CancionesAlbumListComponent implements OnInit, AfterViewInit {
  pageSize: number = environment.registrosPagina;
  Archivo: string = 'Canciones Álbum';
  displayedColumns: string[] = [
    'cancionAlbumId',
    'cancion',
    'album',
    'numero',
    'duracion',
    'publicacion',
    'genero',
    'interpretacion',
    'grupo',
    'acciones',
  ];

  dataSource = new MatTableDataSource<any>();
  total: number = 0;

  Canciones: any = [];

  //#region Permisos
  Seccion = Seccion;
  //#endregion Permisos

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: CancionAlbumService,
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
    this.alerta.borrarCancionAlbum(id, () => this.obtenerLista());
  }

  obtenerLista() {
    this.service.getLista().subscribe(
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

  export() {
    this.alerta.reporte(this.Archivo);
    this.funciones.exportarExcel(this.Canciones, this.Archivo);
  }
}
