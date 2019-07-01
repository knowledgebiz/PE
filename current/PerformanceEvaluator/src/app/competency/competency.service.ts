import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, tap, share } from 'rxjs/operators'
import { Competency } from './competency'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class CompetencyService {

  private url = 'http://127.0.0.1:3000/api/competency'

  constructor( private http: HttpClient ) { }

  getCompetencies(): Observable<Competency[]> {
    return this.http.get<Competency[]>(this.url)
  }

  getCompetency(id: any): Observable<Competency> {
    return this.http.get<Competency>(`${this.url}?id=${id}`)
  }

  getCompetenciesJoin(id: any): Observable<Competency[]> {
    let specificUrl = `http://127.0.0.1:3000/api/competency/form`
    return this.http.get<Competency[]>(`${specificUrl}?id=${id}`)
  }

  getCompetenciesByTerm(term: any): Observable<Competency[]> {
    if (!this.http.get<Competency[]>(`${this.url}?competency=${term}`)){
      return of([])
    }
    return this.http.get<Competency[]>(`${this.url}?competency=${term}`)
  }

  updateCompetency(competency: Competency): Observable<any> {
    return this.http.patch(this.url, competency, httpOptions)
  }

  addCompetency(competency: Competency): Observable<Competency> {
    return this.http.post<Competency>(this.url, competency, httpOptions)
  }

  deleteCompetency(competency: Competency | number): Observable<Competency> {
    const id = typeof competency === 'number' ? competency: competency.id
    return this.http.delete<Competency>(`${this.url}?id=${id}`, httpOptions)
  }
}