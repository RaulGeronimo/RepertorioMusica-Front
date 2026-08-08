import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistaGrupoFormComponent } from './artista-grupo-form.component';

describe('ArtistaGrupoFormComponent', () => {
  let component: ArtistaGrupoFormComponent;
  let fixture: ComponentFixture<ArtistaGrupoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistaGrupoFormComponent]
    });
    fixture = TestBed.createComponent(ArtistaGrupoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
