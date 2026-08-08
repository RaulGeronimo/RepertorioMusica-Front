import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarArtistaComponent } from './buscar-artista.component';

describe('BuscarArtistaComponent', () => {
  let component: BuscarArtistaComponent;
  let fixture: ComponentFixture<BuscarArtistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarArtistaComponent]
    });
    fixture = TestBed.createComponent(BuscarArtistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
