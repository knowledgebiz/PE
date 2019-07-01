import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { retry, catchError } from 'rxjs/operators'
import { EvalModelCompetency } from './eval-model-competency'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class EvalModelCompetencyService {

  private url = 'http://127.0.0.1:3000/api/evalModelCompetency'

  constructor( private http: HttpClient ) { }

  getModelCompetencyRelations(): Observable<EvalModelCompetency[]> {
    return this.http.get<EvalModelCompetency[]>(this.url)
  }

  getModelCompetencyRelation(idModel: any, idCompetency: any): Observable<EvalModelCompetency> {
    return this.http.get<EvalModelCompetency>(`${this.url}?idModel=${idModel}&idCompetency=${idCompetency}`)
  }

  getModelCompetencyRelationByModel(id: any): Observable<EvalModelCompetency[]> {
    return this.http.get<EvalModelCompetency[]>(`${this.url}?idModel=${id}`)
  }
  
  getModelCompetencyRelationByCompetency(id: any): Observable<EvalModelCompetency[]> {
    return this.http.get<EvalModelCompetency[]>(`${this.url}?idCompetency=${id}`)
  }

  addModelCompetencyRelation(evalModelCompetency: EvalModelCompetency): Observable<EvalModelCompetency>{
    return this.http.post<EvalModelCompetency>(this.url, evalModelCompetency, httpOptions)
  }

  deleteModelCompetencyRelation(idModel: any, idCompetency: any): Observable<EvalModelCompetency> {
    return this.http.delete<EvalModelCompetency>(`${this.url}?idModel=${idModel}&idCompetency=${idCompetency}`, httpOptions)
  }
}
