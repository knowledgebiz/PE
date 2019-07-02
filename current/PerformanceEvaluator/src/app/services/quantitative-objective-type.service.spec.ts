import { TestBed } from '@angular/core/testing';

import { QuantitativeObjectiveTypeService } from './quantitative-objective-type.service';

describe('QuantitativeObjectiveTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuantitativeObjectiveTypeService = TestBed.get(QuantitativeObjectiveTypeService);
    expect(service).toBeTruthy();
  });
});
