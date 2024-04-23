import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCardSubServicioComponent } from './custom-card-sub-servicio.component';

describe('CustomCardSubServicioComponent', () => {
  let component: CustomCardSubServicioComponent;
  let fixture: ComponentFixture<CustomCardSubServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomCardSubServicioComponent]
    });
    fixture = TestBed.createComponent(CustomCardSubServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
