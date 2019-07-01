import { Component, OnInit } from '@angular/core';
import { Competency } from '../../competency/competency'
import { CompetencyService } from '../../competency/competency.service'
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
  update = new Subject<Competency[]>()

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
      // window.location.reload()
    }
  }

  getCompetencies(): void {
    this.competencyService.getCompetencies().subscribe(competencies => this.competencies = competencies)
  }

  deleteCompetency(id: Competency | number): void {
    this.competencyService.deleteCompetency(id).subscribe(res => {console.log(res);
      this.competencies = this.competencies.filter((competency) => {
        return competency !== id
      })
    })
  }
}
