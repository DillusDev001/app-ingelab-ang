import { TestBed } from '@angular/core/testing';

import { MuestraFrxService } from './muestra-frx.service';

describe('MuestraFrxService', () => {
  let service: MuestraFrxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MuestraFrxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
