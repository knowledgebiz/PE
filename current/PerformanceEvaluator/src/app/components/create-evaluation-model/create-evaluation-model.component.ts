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
  }

  setTitle() {
    this.titleService.setTitle('Create Model')
  }

  getEvaluationCycles(): void {
    this.cycleService.getCycles().subscribe(cycles => this.cycles = cycles)
  }

}
