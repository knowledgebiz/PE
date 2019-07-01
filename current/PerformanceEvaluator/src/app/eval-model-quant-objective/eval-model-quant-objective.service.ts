import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { retry, catchError } from 'rxjs/operators'
import { EvalModelQuantObjective } from './eval-model-quant-objective'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class EvalModelQuantObjectiveService {

  private url = 'http://127.0.0.1:3000/api/evalModelQuantObjective'

  constructor( private http: HttpClient ) { }

  getModelObjectiveRelations(): Observable<EvalModelQuantObjective[]> {
    return this.http.get<EvalModelQuantObjective[]>(this.url)
  }

  getModelObjectiveRelation(idModel: any, idObjective: any): Observable<EvalModelQuantObjective> {
    return this.http.get<EvalModelQuantObjective>(`${this.url}?idModel=${idModel}&idObjective=${idObjective}`)
  }

  getModelObjectiveRelationByModel(id: any): Observable<EvalModelQuantObjective[]> {
    return this.http.get<EvalModelQuantObjective[]>(`${this.url}?idModel=${id}`)
  }
  
  getModelObjectiveRelationByObjective(id: any): Observable<EvalModelQuantObjective[]> {
    return this.http.get<EvalModelQuantObjective[]>(`${this.url}?idObjective=${id}`)
  }

  addModelObjectiveRelation(evalModelQuantObjective: EvalModelQuantObjective): Observable<EvalModelQuantObjective>{
    return this.http.post<EvalModelQuantObjective>(this.url, evalModelQuantObjective, httpOptions)
  }

  deleteModelObjectiveRelation(idModel: any, idObjective: any): Observable<EvalModelQuantObjective> {
    return this.http.delete<EvalModelQuantObjective>(`${this.url}?idModel=${idModel}&idObjective=${idObjective}`, httpOptions)
  }
}
