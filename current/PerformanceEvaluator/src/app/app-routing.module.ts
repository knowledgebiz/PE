import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvaluationFormsComponent } from './components/evaluation-forms/evaluation-forms.component';
import { FormListComponent } from './components/form-list/form-list.component'
import { CreateCompetenciesComponent } from './components/create-competencies/create-competencies.component'

const routes: Routes = [
  { path: 'form', component: EvaluationFormsComponent},
  { path: 'list', component: FormListComponent },
  { path: 'competency', component: CreateCompetenciesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
