import { TestBed } from '@angular/core/testing';

import { MuestraParametroFrxService } from './muestra-parametro-frx.service';

describe('MuestraParametroFrxService', () => {
  let service: MuestraParametroFrxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MuestraParametroFrxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
