import { TestBed } from '@angular/core/testing';

import { GastoDetalleService } from './gasto-detalle.service';

describe('GastoDetalleService', () => {
  let service: GastoDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GastoDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
