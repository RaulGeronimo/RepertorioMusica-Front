import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisqueraListComponent } from './disquera-list.component';

describe('DisqueraListComponent', () => {
  let component: DisqueraListComponent;
  let fixture: ComponentFixture<DisqueraListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisqueraListComponent]
    });
    fixture = TestBed.createComponent(DisqueraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
