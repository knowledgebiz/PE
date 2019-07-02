import { TestBed } from '@angular/core/testing';

import { EvalModelCompetencyService } from './eval-model-competency.service';

describe('EvalModelCompetencyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvalModelCompetencyService = TestBed.get(EvalModelCompetencyService);
    expect(service).toBeTruthy();
  });
});
