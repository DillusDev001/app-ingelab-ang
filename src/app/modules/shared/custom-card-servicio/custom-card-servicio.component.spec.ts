import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCardServicioComponent } from './custom-card-servicio.component';

describe('CustomCardServicioComponent', () => {
  let component: CustomCardServicioComponent;
  let fixture: ComponentFixture<CustomCardServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomCardServicioComponent]
    });
    fixture = TestBed.createComponent(CustomCardServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
