import { TestBed } from '@angular/core/testing';

import { EvalModelQuantObjectiveService } from './eval-model-quant-objective.service';

describe('EvalModelQuantObjectiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvalModelQuantObjectiveService = TestBed.get(EvalModelQuantObjectiveService);
    expect(service).toBeTruthy();
  });
});
