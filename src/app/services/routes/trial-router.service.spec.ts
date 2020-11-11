import { TestBed } from '@angular/core/testing';

import { TrialRouterService } from './trial-router.service';

describe('TrialRouterService', () => {
  let service: TrialRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrialRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
