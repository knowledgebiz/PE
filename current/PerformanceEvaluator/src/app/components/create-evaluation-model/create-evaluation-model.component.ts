import { Component, OnInit } from '@angular/core';
import { EvaluationModel } from '../../classes/evaluation-model'
import { EvaluationCycle } from '../../classes/evaluation-cycle'
import { Competency } from '../../classes/competency'
import { QuantitativeObjective } from '../../classes/quantitative-objective'
import { EvaluationModelService } from '../../services/evaluation-model.service'
import { EvaluationCycleService } from '../../services/evaluation-cycle.service'
import { CompetencyService } from '../../services/competency.service'
import { QuantitativeObjectiveService } from '../../services/quantitative-objective.service'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-create-evaluation-model',
  templateUrl: './create-evaluation-model.component.html',
  styleUrls: ['./create-evaluation-model.component.css']
})
export class CreateEvaluationModelComponent implements OnInit {

  model: EvaluationModel
  models: EvaluationModel[]
  cycle: EvaluationCycle
  cycles: EvaluationCycle[]
  competency: Competency
  competencies: Competency[]
  objective: QuantitativeObjective
  objectives: QuantitativeObjective[]

  constructor(
    private titleService: Title,
    private modelService: EvaluationModelService,
    private cycleService: EvaluationCycleService,
    private competencyService: CompetencyService,
    private objectiveService: QuantitativeObjectiveService
  ) { }

  ngOnInit() {
    this.setTitle()
    this.getEvaluationCycles()
    this.getQuantObjectives()
    this.getCompetencies()
    this.modelService.newModel$.subscribe(newModel => { this.model = newModel} )
  }

  setTitle() {
    this.titleService.setTitle('Create Model')
  }

  getNewModel() {
    this.model = this.modelService.newModel.getValue()
    console.log(this.model)
  }

  getEvaluationCycles(): void {
    this.cycleService.getCycles().subscribe(cycles => this.cycles = cycles)
  }

  getCompetencies(): void {
    this.competencyService.getCompetencies().subscribe(competencies => this.competencies = competencies)
  }

  getQuantObjectives(): void {
    this.objectiveService.getObjectives().subscribe(objectives => this.objectives = objectives)
  }

  createEvaluationModel(model: string, idCycle: number): void {
    this.modelService.addEvaluationModel( { model, idCycle } as EvaluationModel ).subscribe(model => this.models.push(model))
    this.model = this.modelService.newModel.getValue()
    const a = this.modelService.newModel.getValue()
    console.log(this.model)
    console.log(a)
  }

}
