import { TestBed } from '@angular/core/testing';

import { CotizacionGeneralSubServicioService } from './cotizacion-general-sub-servicio.service';

describe('CotizacionGeneralSubServicioService', () => {
  let service: CotizacionGeneralSubServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CotizacionGeneralSubServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
