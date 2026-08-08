import { TestBed } from '@angular/core/testing';

import { InstrumentoArtistaGrupoService } from './instrumento-artista-grupo.service';

describe('InstrumentoArtistaGrupoService', () => {
  let service: InstrumentoArtistaGrupoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstrumentoArtistaGrupoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
