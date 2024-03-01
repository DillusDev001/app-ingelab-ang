import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCotizacionComponent } from './lista-cotizacion.component';

describe('ListaCotizacionComponent', () => {
  let component: ListaCotizacionComponent;
  let fixture: ComponentFixture<ListaCotizacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaCotizacionComponent]
    });
    fixture = TestBed.createComponent(ListaCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
