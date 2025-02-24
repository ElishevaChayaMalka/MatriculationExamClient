import { TestBed } from '@angular/core/testing';

import { getData } from './getData.service';

describe('LoginServiceService', () => {
  let service: getData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(getData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
