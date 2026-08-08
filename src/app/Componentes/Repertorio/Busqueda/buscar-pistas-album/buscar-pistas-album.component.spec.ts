import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPistasAlbumComponent } from './buscar-pistas-album.component';

describe('BuscarPistasAlbumComponent', () => {
  let component: BuscarPistasAlbumComponent;
  let fixture: ComponentFixture<BuscarPistasAlbumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarPistasAlbumComponent]
    });
    fixture = TestBed.createComponent(BuscarPistasAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
