import { TestBed } from '@angular/core/testing';

import { SpectaclesService } from './spectacles.service';

describe('SpectaclesService', () => {
  let service: SpectaclesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpectaclesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
