import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators'
import { EvaluationModel } from './evaluation-model'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class EvaluationModelService {

  private url = 'http://127.0.0.1:3000/api/evaluationModel'

  constructor( private http: HttpClient ) { }

  getEvaluationModels(): Observable<EvaluationModel[]> {
    return this.http.get<EvaluationModel[]>(this.url)
  }

  getEvaluationModel(id: any): Observable<EvaluationModel> {
    return this.http.get<EvaluationModel>(`${this.url}?id=${id}`)
  }

  getEvaluationModelsByTerm(term: any): Observable<EvaluationModel[]> {
    if (!this.http.get<EvaluationModel[]>(`${this.url}?model=${term}`)){
      return of([])
    }
    return this.http.get<EvaluationModel[]>(`${this.url}?model=${term}`)
  }

  getEvaluationModelByCycle(id: any): Observable<EvaluationModel> {
    return this.http.get<EvaluationModel>(`${this.url}?idCycle=${id}`)
  }

  updateEvaluationModel(evaluationModel: EvaluationModel): Observable<any> {
    return this.http.patch(this.url, evaluationModel, httpOptions)
  }

  addEvaluationModel(evaluationModel: EvaluationModel): Observable<EvaluationModel> {
    return this.http.post<EvaluationModel>(this.url, evaluationModel, httpOptions)
  }

  deleteEvaluationModel(evaluationModel: EvaluationModel | number): Observable<EvaluationModel> {
    const id = typeof evaluationModel === 'number' ? evaluationModel: evaluationModel.id
    return this.http.delete<EvaluationModel>(`${this.url}?id=${id}`)
  }
}
