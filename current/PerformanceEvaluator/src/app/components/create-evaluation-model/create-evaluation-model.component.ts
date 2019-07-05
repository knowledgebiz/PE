import { Component, OnInit } from '@angular/core';
import { EvaluationModel } from '../../classes/evaluation-model'
import { EvaluationCycle } from '../../classes/evaluation-cycle'
import { Competency } from '../../classes/competency'
import { QuantitativeObjective } from '../../classes/quantitative-objective'
import { EvalModelCompetency } from '../../classes/eval-model-competency'
import { EvalModelQuantObjective } from '../../classes/eval-model-quant-objective'
import { EvalModelCompetencyService } from '../../services/eval-model-competency.service'
import { EvalModelQuantObjectiveService } from '../../services/eval-model-quant-objective.service'
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
  modelCompetency: EvalModelCompetency
  modelObjective: EvalModelQuantObjective
  objectiveIds: number[]
  competencyIds: number[]

  

  constructor(
    private titleService: Title,
    private modelService: EvaluationModelService,
    private cycleService: EvaluationCycleService,
    private competencyService: CompetencyService,
    private objectiveService: QuantitativeObjectiveService,
    private modelCompetencyService: EvalModelCompetencyService,
    private modelObjectiveService: EvalModelQuantObjectiveService
  ) { }

  ngOnInit() {
    this.competencyIds = []
    this.objectiveIds = []
    this.setTitle()
    this.getEvaluationCycles()
    this.getQuantObjectives()
    this.getCompetencies()
    this.modelService.newModel$.subscribe(newModel => { this.model = newModel} )
  }

  setTitle() {
    this.titleService.setTitle('Create Model')
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

  createEvaluationModel(model: string, idCycle: number){
    this.modelService.addEvaluationModel( { model, idCycle } as EvaluationModel ).subscribe(model => this.models.push(model))
    
    const newModel = this.modelService.newModel.getValue()
    setTimeout( () => {
      this.getNewEvaluationModelByCycle(newModel.idCycle)
    }, 300)
    
  }

  addCompetency(idCompetency: number) {
    let exists = false
    for (let i = 0; i < this.competencyIds.length; i++)
    {
      if (this.competencyIds[i] == idCompetency){
        exists = true
      }
    }
    if (exists === false) {
      this.competencyIds.push(idCompetency)
    }
    
  }

  addObjective(idObjective: number) {
    let exists = false
    for (let i = 0; i < this.objectiveIds.length; i++)
    {
      if (this.objectiveIds[i] == idObjective){
        exists = true
      }
    }
    if (exists === false) {
      this.objectiveIds.push(idObjective)
    }
    
  }

  async getNewEvaluationModelByCycle(idCycle: number) {
    const model = this.modelService.getEvaluationModelByCycle(idCycle)
    const newModel = await model.toPromise()
    this.createRelations(newModel.id)
  }

  createRelations(idModel: number) {
    for (let i = 0; i < this.competencyIds.length; i++){
      let idCompetency = this.competencyIds[i]
      this.modelCompetencyService.addModelCompetencyRelation( {idModel, idCompetency } as EvalModelCompetency ).subscribe()
    }

    for (let i = 0; i < this.objectiveIds.length; i++) {
      let idObjective = this.objectiveIds[i]
      this.modelObjectiveService.addModelObjectiveRelation( { idModel, idObjective } as EvalModelQuantObjective ).subscribe()
    } 
    this.competencyIds = []
    this.objectiveIds = []
  }

}
