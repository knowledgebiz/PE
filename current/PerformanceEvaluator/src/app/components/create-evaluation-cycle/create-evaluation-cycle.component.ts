import { Component, OnInit } from '@angular/core';
import { EvaluationCycle } from '../../classes/evaluation-cycle'
import { EvaluationCycleService } from '../../services/evaluation-cycle.service'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-create-evaluation-cycle',
  templateUrl: './create-evaluation-cycle.component.html',
  styleUrls: ['./create-evaluation-cycle.component.css']
})
export class CreateEvaluationCycleComponent implements OnInit {

  cycle: EvaluationCycle
  cycles: EvaluationCycle[]

  constructor(
    private titleService: Title,
    private cycleService: EvaluationCycleService
  ) { }

  ngOnInit() {
    this.setTitle()
    this.getEvaluationCycles()
  }

  setTitle () {
    this.titleService.setTitle('Evaluation Cycles')
  }

  createEvaluationCycle(startDate: Date, endDate: Date): void {
    let dateStart = new Date(startDate)
    let dateEnd = new Date(endDate)

    console.log(dateStart < dateEnd)

    if (isNaN(dateStart.getTime()) || isNaN(dateEnd.getTime())) {
      return window.alert('Invalid date')
    }
    if(dateStart >= dateEnd){
      return window.alert('The cycle cannot end before it has started, nor can it end in the same day.')
    }
    
    this.cycleService.addCycle( {startDate, endDate } as EvaluationCycle ).subscribe(cycle => this.cycles.push(cycle))
    window.location.reload()
  }
  getEvaluationCycles(): void {
    this.cycleService.getCycles().subscribe(cycles => this.cycles = cycles)
  }

  updateEvaluationCycle(id: number, startDate: Date, endDate: Date): void {

    let dateStart = new Date(startDate)
    let dateEnd = new Date(endDate)

    console.log(dateStart < dateEnd)

    if (isNaN(dateStart.getTime()) || isNaN(dateEnd.getTime())) {
      return window.alert('Invalid date')
    }
    if(dateStart >= dateEnd){
      return window.alert('The cycle cannot end before it has started, nor can it end in the same day.')
    }
    this.cycleService.updateCycle( {id, startDate, endDate } as EvaluationCycle).subscribe(cycle => console.log(cycle))
  }

  deleteEvaluationCycle(cycleToDelete: EvaluationCycle): void {
    this.cycleService.deleteCycle(cycleToDelete).subscribe(res => {console.log(res);
      this.cycles = this.cycles.filter((cycle) => {
        return cycle != cycleToDelete
      })})
  }

}
