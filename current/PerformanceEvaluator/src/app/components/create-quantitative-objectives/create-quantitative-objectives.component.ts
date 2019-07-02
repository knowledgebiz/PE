import { Component, OnInit } from '@angular/core';
import { QuantitativeObjective } from '../../classes/quantitative-objective'
import { QuantitativeObjectiveType } from '../../classes/quantitative-objective-type'
import { QuantitativeObjectiveService } from '../../services/quantitative-objective.service'
import { QuantitativeObjectiveTypeService } from '../../services/quantitative-objective-type.service'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-create-quantitative-objectives',
  templateUrl: './create-quantitative-objectives.component.html',
  styleUrls: ['./create-quantitative-objectives.component.css']
})
export class CreateQuantitativeObjectivesComponent implements OnInit {

  objective: QuantitativeObjective
  objectives: QuantitativeObjective[]
  type: QuantitativeObjectiveType
  types: QuantitativeObjectiveType[]

  constructor(
    private titleService: Title,
    private objectiveService: QuantitativeObjectiveService,
    private typeService: QuantitativeObjectiveTypeService,
  ) { }

  ngOnInit() {
    this.setTitle()
    this.getQuantObjectives()
    this.getQuantObjectiveTypes()
  }

  setTitle () {
    this.titleService.setTitle('Quantitative Objectives')
  }

  createQuantObjective(objective: string, idObjectiveType: number): void {
    objective = objective.trim()
    console.log('aqui1')
    console.log(idObjectiveType)
    console.log('ali1')
    if (objective) {
      this.objectiveService.addObjective( { objective, idObjectiveType } as QuantitativeObjective ).subscribe(objective => this.objectives.push(objective))
      window.location.reload()
    }
  }

  getQuantObjectives(): void {
    this.objectiveService.getObjectives().subscribe(objectives => this.objectives = objectives)
  }

  getQuantObjectiveTypes(): void {
    this.typeService.getObjectiveTypes().subscribe(types => this.types = types)
  }

  updateQuantObjective(id: number, objective: string, idObjectiveType: number): void {
    this.objectiveService.updateObjective( {id, objective, idObjectiveType} as QuantitativeObjective).subscribe(objective => console.log(objective))
  }

  deleteQuantObjective(objectiveToDelete: QuantitativeObjective | number): void {
    this.objectiveService.deleteObjective(objectiveToDelete).subscribe(res => {console.log(res);
      this.objectives = this.objectives.filter((objective) => {
        return objective !== objectiveToDelete
      })
    })
  }
}

