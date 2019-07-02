import { TestBed } from '@angular/core/testing';

import { QuantitativeObjectiveService } from './quantitative-objective.service';

describe('QuantitativeObjectiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuantitativeObjectiveService = TestBed.get(QuantitativeObjectiveService);
    expect(service).toBeTruthy();
  });
});
