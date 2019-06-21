import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationModelsComponent } from './evaluation-models.component';

describe('EvaluationModelsComponent', () => {
  let component: EvaluationModelsComponent;
  let fixture: ComponentFixture<EvaluationModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
