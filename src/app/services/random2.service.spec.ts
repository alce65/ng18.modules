import { TestBed } from '@angular/core/testing';

import { Random2Service } from './random2.service';

describe('Random2Service', () => {
  let service: Random2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Random2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
