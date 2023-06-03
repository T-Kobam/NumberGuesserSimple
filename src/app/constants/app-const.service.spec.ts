import { TestBed } from '@angular/core/testing';

import { AppConstService } from './app-const.service';

describe('AppConstService', () => {
  let service: AppConstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppConstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
