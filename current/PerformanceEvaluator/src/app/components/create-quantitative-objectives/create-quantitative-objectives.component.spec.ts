import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuantitativeObjectivesComponent } from './create-quantitative-objectives.component';

describe('CreateQuantitativeObjectivesComponent', () => {
  let component: CreateQuantitativeObjectivesComponent;
  let fixture: ComponentFixture<CreateQuantitativeObjectivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQuantitativeObjectivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuantitativeObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
