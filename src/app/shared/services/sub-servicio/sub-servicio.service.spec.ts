import { TestBed } from '@angular/core/testing';

import { SubServicioService } from './sub-servicio.service';

describe('SubServicioService', () => {
  let service: SubServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
