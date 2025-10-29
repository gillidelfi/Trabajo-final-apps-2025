import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { onlyPublicUserGuard } from './only-public-user-guard';

describe('onlyPublicUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => onlyPublicUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});