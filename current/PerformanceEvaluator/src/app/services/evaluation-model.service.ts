import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { retry, catchError } from 'rxjs/operators'
import { EvaluationModel } from '../classes/evaluation-model'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class EvaluationModelService {

  private url = 'http://127.0.0.1:3000/api/evaluationModel'

  newModel: BehaviorSubject<EvaluationModel> = new BehaviorSubject<EvaluationModel>(null)
  newModel$ = this.newModel.asObservable()

  constructor( private http: HttpClient ) { }

  getEvaluationModels(): Observable<EvaluationModel[]> {
    return this.http.get<EvaluationModel[]>(this.url)
  }

  getEvaluationModel(id: any): Observable<EvaluationModel> {
    return this.http.get<EvaluationModel>(`${this.url}?id=${id}`)
  }

  getActiveEvaluationModel(): Observable<EvaluationModel> {
    return this.http.get<EvaluationModel>(`${this.url}?active=1`)
  }

  getWorker() {
    return this.http.get(`${this.url}/worker`)
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
    this.newModel.next(evaluationModel)
    return this.http.post<EvaluationModel>(this.url, evaluationModel, httpOptions)
  }

  deactivateEvaluationModel(id: any): Observable<EvaluationModel> {
    return this.http.patch<EvaluationModel>(`${this.url}/${id}`, httpOptions)
  }

  deleteEvaluationModel(evaluationModel: EvaluationModel | number): Observable<EvaluationModel> {
    const id = typeof evaluationModel === 'number' ? evaluationModel: evaluationModel.id
    return this.http.delete<EvaluationModel>(`${this.url}?id=${id}`, httpOptions)
  }
}
