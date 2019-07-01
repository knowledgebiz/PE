import { Component, OnInit } from '@angular/core';

import { EvaluationModel } from '../../evaluation-model/evaluation-model'
import { EvaluationModelService } from '../../evaluation-model/evaluation-model.service'

import { EvaluationCycle } from '../../evaluation-cycle/evaluation-cycle'
import { EvaluationCycleService } from '../../evaluation-cycle/evaluation-cycle.service'

import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {

  model: EvaluationModel
  models: EvaluationModel[]
  cycle: EvaluationCycle
  cycles: EvaluationCycle[]

  constructor(
    private titleService: Title,
    private modelService: EvaluationModelService,
    private cycleService: EvaluationCycleService
  ) { }

  ngOnInit() {
    this.setTitle()
    this.getEvaluationModels()
  }

  setTitle () {
    this.titleService.setTitle('List of Models')
  }

  getEvaluationModels(): void {
    this.modelService.getEvaluationModels().subscribe(models => this.models = models)
  }

  getEvaluationCycles(): void {
    this.cycleService.getCycles().subscribe(cycles => this.cycles = cycles)
  }

  deleteEvaluationModel(mod: EvaluationModel | number): void {
    this.modelService.deleteEvaluationModel(mod).subscribe(res => {console.log(res);
      this.models = this.models.filter((model) => {
        return model !== mod
      })
    })
  }

}