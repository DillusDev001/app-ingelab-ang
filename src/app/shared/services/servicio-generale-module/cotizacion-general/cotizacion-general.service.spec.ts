import { TestBed } from '@angular/core/testing';

import { CotizacionGeneralService } from './cotizacion-general.service';

describe('CotizacionGeneralService', () => {
  let service: CotizacionGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CotizacionGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
