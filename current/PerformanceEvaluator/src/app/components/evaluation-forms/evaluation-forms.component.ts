import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { Title } from '@angular/platform-browser'


// Classes

import { EvaluationModel } from '../../evaluation-model/evaluation-model'
import { Evaluation } from '../../evaluation/evaluation'
import { Competency } from '../../competency/competency'
import { QuantitativeObjective } from '../../quantitative-objective/quantitative-objective'
import { QuantitativeObjectiveType } from '../../quantitative-objective-type/quantitative-objective-type'
import { EvalModelCompetency } from '../../eval-model-competency/eval-model-competency'
import { EvalModelQuantObjective } from '../../eval-model-quant-objective/eval-model-quant-objective'

// Services

import { EvaluationModelService } from '../../evaluation-model/evaluation-model.service'
import { EvaluationService } from '../../evaluation/evaluation.service'
import { CompetencyService } from '../../competency/competency.service'
import { QuantitativeObjectiveService } from '../../quantitative-objective/quantitative-objective.service'
import { QuantitativeObjectiveTypeService } from '../../quantitative-objective-type/quantitative-objective-type.service'
import { EvalModelCompetencyService } from '../../eval-model-competency/eval-model-competency.service'
import { EvalModelQuantObjectiveService } from '../../eval-model-quant-objective/eval-model-quant-objective.service'
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-evaluation-forms',
  templateUrl: './evaluation-forms.component.html',
  styleUrls: ['./evaluation-forms.component.css']
})
export class EvaluationFormsComponent implements OnInit {

  model: EvaluationModel
  models: EvaluationModel[]
  competency: Competency
  competencies: Competency[]
  objective: QuantitativeObjective
  objectives: QuantitativeObjective[]
  modelCompetencyRelation: EvalModelCompetency
  modelCompetencyRelations: EvalModelCompetency[]
  modelObjectiveRelation: EvalModelQuantObjective
  modelObjectiveRelations: EvalModelQuantObjective[]
  evaluation: Evaluation
  evaluations: Evaluation[]

  hopethisworks: {}

  form: FormGroup

  validator = new FormControl('', Validators.required)

  formatLabel(value: number) {
    if(!value) {
      return 0
    }
    return `${value}%`
  }


  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    // private formBuilder: FormBuilder,
    private modelService: EvaluationModelService,
    private competencyService: CompetencyService,
    private objectiveService: QuantitativeObjectiveService,
    private modelCompetencyService: EvalModelCompetencyService,
    private modelObjectiveService: EvalModelQuantObjectiveService,
    private evaluationService: EvaluationService
  ) { }

  async ngOnInit(){
    const model = await this.getEvaluationModel()
    this.setTitle(model.model)
    this.getModelCompetencyRelations(model.id)
    this.getModelObjectiveRelations(model.id)
    this.getObjectives(model.id)
    this.getCompetencies(model.id)
  }

  async getEvaluationModel() {
    const idModel = this.route.snapshot.queryParamMap.get('id')
    if (idModel){
      const model = await this.modelService.getEvaluationModel(idModel).toPromise()
      return model
    }
    // this.modelService.getActiveEvaluationModel().subscribe(model => this.model = model)
    const model = await this.modelService.getActiveEvaluationModel().toPromise()
    return model
  }

  getModelCompetencyRelations(idModel): void {
    this.modelCompetencyService.getModelCompetencyRelationByModel(idModel)
      .subscribe(modelCompetencyRelations => this.modelCompetencyRelations = modelCompetencyRelations)
  }

  getModelObjectiveRelations(idModel): void {
    this.modelObjectiveService.getModelObjectiveRelationByModel(idModel)
      .subscribe(modelObjectiveRelations => this.modelObjectiveRelations = modelObjectiveRelations)
  }

  // getCompetencies(): void {
  //   this.competencyService.getCompetencies()
  //     .subscribe(competencies => this.competencies = competencies)
  // }

  getObjectives(idModel): void {
    this.objectiveService.getObjectivesJoin(idModel)
      .subscribe(objectives => this.objectives = objectives)
  }

  getCompetencies(idModel): void {
    this.competencyService.getCompetenciesJoin(idModel)
      .subscribe(competencies => this.competencies = competencies)
  }
  public setTitle (title): void {
    this.titleService.setTitle('Model: ' + title)
  }


}
