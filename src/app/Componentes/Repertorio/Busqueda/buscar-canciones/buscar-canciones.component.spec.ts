import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarCancionesComponent } from './buscar-canciones.component';

describe('BuscarCancionesComponent', () => {
  let component: BuscarCancionesComponent;
  let fixture: ComponentFixture<BuscarCancionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarCancionesComponent]
    });
    fixture = TestBed.createComponent(BuscarCancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
