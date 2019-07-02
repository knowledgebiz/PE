import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEvaluationCycleComponent } from './create-evaluation-cycle.component';

describe('CreateEvaluationCycleComponent', () => {
  let component: CreateEvaluationCycleComponent;
  let fixture: ComponentFixture<CreateEvaluationCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEvaluationCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEvaluationCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
