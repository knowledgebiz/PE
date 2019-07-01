import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompetenciesComponent } from './create-competencies.component';

describe('CreateCompetenciesComponent', () => {
  let component: CreateCompetenciesComponent;
  let fixture: ComponentFixture<CreateCompetenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCompetenciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompetenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
