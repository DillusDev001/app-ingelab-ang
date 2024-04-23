import { TestBed } from '@angular/core/testing';

import { CotizacionFrxService } from './cotizacion-frx.service';

describe('CotizacionFrxService', () => {
  let service: CotizacionFrxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CotizacionFrxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
