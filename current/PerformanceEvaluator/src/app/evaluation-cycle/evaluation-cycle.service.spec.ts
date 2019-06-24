import { TestBed } from '@angular/core/testing';

import { EvaluationCycleService } from './evaluation-cycle.service';

describe('EvaluationCycleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvaluationCycleService = TestBed.get(EvaluationCycleService);
    expect(service).toBeTruthy();
  });
});
