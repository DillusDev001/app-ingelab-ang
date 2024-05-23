import { TestBed } from '@angular/core/testing';

import { ProovedorService } from './proovedor.service';

describe('ProovedorService', () => {
  let service: ProovedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProovedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
