import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvaluationFormsComponent } from './components/evaluation-forms/evaluation-forms.component';
import { FormListComponent } from './components/form-list/form-list.component'
import { CreateEvaluationModelComponent } from './components/create-evaluation-model/create-evaluation-model.component';
import { CreateCompetenciesComponent } from './components/create-competencies/create-competencies.component'
import { CreateEvaluationCycleComponent } from './components/create-evaluation-cycle/create-evaluation-cycle.component'
import { CreateQuantitativeObjectivesComponent } from './components/create-quantitative-objectives/create-quantitative-objectives.component'

const routes: Routes = [
  { path: 'form', component: EvaluationFormsComponent },
  { path: 'list', component: FormListComponent },
  { path: 'competency', component: CreateCompetenciesComponent },
  { path: 'objective', component: CreateQuantitativeObjectivesComponent },
  { path: 'model', component: CreateEvaluationModelComponent },
  { path: 'cycle', component: CreateEvaluationCycleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
