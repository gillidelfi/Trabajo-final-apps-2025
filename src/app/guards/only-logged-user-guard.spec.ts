import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { onlyLoggedUserGuard } from './only-logged-user-guard';

describe('onlyLoggedUserGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => onlyLoggedUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});