import { Component, OnInit } from '@angular/core';
import { Competency } from '../../classes/competency'
import { CompetencyService } from '../../services/competency.service'
import { Title } from '@angular/platform-browser'
import { Subject } from 'rxjs'


@Component({
  selector: 'app-create-competencies',
  templateUrl: './create-competencies.component.html',
  styleUrls: ['./create-competencies.component.css']
})
export class CreateCompetenciesComponent implements OnInit {

  competency: Competency
  competencies: Competency[]
  showForm : boolean = false

  constructor( 
    private competencyService: CompetencyService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.setTitle()
    this.getCompetencies()
  }

  setTitle () {
    this.titleService.setTitle('Competencies')
  }

  createCompetency(competency: string): void {
    competency = competency.trim()
    if (competency) {
      this.competencyService.addCompetency( { competency } as Competency ).subscribe(competency => this.competencies.push(competency))
      window.location.reload()
    }
  }

  getCompetencies(): void {
    this.competencyService.getCompetencies().subscribe(competencies => this.competencies = competencies)
  }

  getCompetency(id: number): void {
    this.competencyService.getCompetency(id).subscribe(competency => this.competency = competency)
  }

  updateCompetency(id: number, competency: string): void {
    this.competencyService.updateCompetency( {id, competency} as Competency).subscribe(competency => console.log(competency))
  }

  deleteCompetency(competencyToDelete: Competency | number): void {
    this.competencyService.deleteCompetency(competencyToDelete).subscribe(res => {console.log(res);
      this.competencies = this.competencies.filter((competency) => {
        return competency !== competencyToDelete
      })
    })
  }
}
