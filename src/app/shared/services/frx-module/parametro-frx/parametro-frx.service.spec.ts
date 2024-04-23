import { TestBed } from '@angular/core/testing';

import { ParametroFrxService } from './parametro-frx.service';

describe('ParametroService', () => {
  let service: ParametroFrxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametroFrxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
