import { TestBed } from '@angular/core/testing';

import { RecepcionFrxService } from './recepcion-frx.service';

describe('RecepcionFrxService', () => {
  let service: RecepcionFrxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecepcionFrxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
