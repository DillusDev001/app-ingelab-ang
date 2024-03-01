import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCotizacionServicioComponent } from './lista-cotizacion-servicio.component';

describe('ListaCotizacionServicioComponent', () => {
  let component: ListaCotizacionServicioComponent;
  let fixture: ComponentFixture<ListaCotizacionServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaCotizacionServicioComponent]
    });
    fixture = TestBed.createComponent(ListaCotizacionServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
