import { Component, OnInit } from '@angular/core';

import { EvaluationModel } from '../../classes/evaluation-model'
import { EvaluationModelService } from '../../services/evaluation-model.service'

import { EvaluationCycle } from '../../classes/evaluation-cycle'
import { EvaluationCycleService } from '../../services/evaluation-cycle.service'

import { Title } from '@angular/platform-browser'
import { share } from 'rxjs/operators';

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
    this.getEvaluationCycles()
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

  deactivateEvaluationModel(model: EvaluationModel): void {
    this.modelService.deactivateEvaluationModel(model.id).subscribe(model => console.log(model))
  }

  deleteEvaluationModel(mod: EvaluationModel | number): void {
    this.modelService.deleteEvaluationModel(mod).subscribe(res => {console.log(res);
      this.models = this.models.filter((model) => {
        return model !== mod
      })
    })
  }

}