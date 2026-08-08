import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancionesFormComponent } from './canciones-form.component';

describe('CancionesFormComponent', () => {
  let component: CancionesFormComponent;
  let fixture: ComponentFixture<CancionesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancionesFormComponent]
    });
    fixture = TestBed.createComponent(CancionesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
