import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentoArtistaFormComponent } from './instrumento-artista-form.component';

describe('InstrumentoArtistaFormComponent', () => {
  let component: InstrumentoArtistaFormComponent;
  let fixture: ComponentFixture<InstrumentoArtistaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstrumentoArtistaFormComponent]
    });
    fixture = TestBed.createComponent(InstrumentoArtistaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
