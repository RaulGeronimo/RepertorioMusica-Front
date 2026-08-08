import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentoArtistaListComponent } from './instrumento-artista-list.component';

describe('InstrumentoArtistaListComponent', () => {
  let component: InstrumentoArtistaListComponent;
  let fixture: ComponentFixture<InstrumentoArtistaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstrumentoArtistaListComponent]
    });
    fixture = TestBed.createComponent(InstrumentoArtistaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
