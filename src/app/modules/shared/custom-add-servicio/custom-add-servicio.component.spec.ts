import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAddServicioComponent } from './custom-add-servicio.component';

describe('CustomAddServicioComponent', () => {
  let component: CustomAddServicioComponent;
  let fixture: ComponentFixture<CustomAddServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomAddServicioComponent]
    });
    fixture = TestBed.createComponent(CustomAddServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
