import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAlertSearchServicioComponent } from './custom-alert-search-servicio.component';

describe('CustomAlertSearchServicioComponent', () => {
  let component: CustomAlertSearchServicioComponent;
  let fixture: ComponentFixture<CustomAlertSearchServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomAlertSearchServicioComponent]
    });
    fixture = TestBed.createComponent(CustomAlertSearchServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
