import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { retry, catchError } from 'rxjs/operators'
import { QuantitativeObjective } from '../classes/quantitative-objective'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class QuantitativeObjectiveService {

  private url = 'http://127.0.0.1:3000/api/objective'

  constructor( private http: HttpClient ) { }

  getObjectives(): Observable<QuantitativeObjective[]> {
    return this.http.get<QuantitativeObjective[]>(this.url)
  }

  getObjective(id: any): Observable<QuantitativeObjective> {
    return this.http.get<QuantitativeObjective>(`${this.url}?id=${id}`)
  }

  getObjectivesJoin(id:any): Observable<QuantitativeObjective[]> { // FOR TESTING PURPOSES
    let specificUrl = 'http://127.0.0.1:3000/api/objective/form'
    return this.http.get<QuantitativeObjective[]>(`${specificUrl}?id=${id}`)
  }

  getObjectivesByTerm(term: any): Observable<QuantitativeObjective[]> {
    if (!this.http.get<QuantitativeObjective[]>(`${this.url}?objective=${term}`)){
      return of([])
    }
    return this.http.get<QuantitativeObjective[]>(`${this.url}?objective=${term}`)
  }

  getObjectivesByObjectiveType(id: any): Observable<QuantitativeObjective[]> {
    if (!this.http.get<QuantitativeObjective[]>(`${this.url}?idObjectiveType=${id}`)){
      return of([])
    }
    return this.http.get<QuantitativeObjective[]>(`${this.url}?idObjectiveType=${id}`)
  }


  updateObjective(quantitativeObjective: QuantitativeObjective): Observable<any> {
    return this.http.patch(this.url, quantitativeObjective, httpOptions)
  }

  addObjective(quantitativeObjective: QuantitativeObjective): Observable<QuantitativeObjective> {
    console.log('aqui')
    console.log(quantitativeObjective)
    console.log('ali')
    return this.http.post<QuantitativeObjective>(this.url, quantitativeObjective, httpOptions)
  }

  deleteObjective(quantitativeObjective: QuantitativeObjective | number): Observable<QuantitativeObjective> {
    const id = typeof quantitativeObjective === 'number' ? quantitativeObjective: quantitativeObjective.id
    return this.http.delete<QuantitativeObjective>(`${this.url}?id=${id}`, httpOptions)
  }
}
