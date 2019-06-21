import { TestBed } from '@angular/core/testing';

import { EvaluationModelService } from './evaluation-model.service';

describe('EvaluationModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvaluationModelService = TestBed.get(EvaluationModelService);
    expect(service).toBeTruthy();
  });
});
