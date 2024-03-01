import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCotizacionServicioComponent } from './agregar-cotizacion-servicio.component';

describe('AgregarCotizacionServicioComponent', () => {
  let component: AgregarCotizacionServicioComponent;
  let fixture: ComponentFixture<AgregarCotizacionServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarCotizacionServicioComponent]
    });
    fixture = TestBed.createComponent(AgregarCotizacionServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
