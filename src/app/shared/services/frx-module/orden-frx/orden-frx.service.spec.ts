import { TestBed } from '@angular/core/testing';

import { OrdenFrxService } from './orden-frx.service';

describe('OrdenFrxService', () => {
  let service: OrdenFrxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdenFrxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
