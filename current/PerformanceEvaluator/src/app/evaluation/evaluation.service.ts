import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { retry, catchError } from 'rxjs/operators'
import { Evaluation } from './evaluation'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private url = 'http://127.0.0.1:3000/api/evaluation'

  constructor( private http: HttpClient ) { }

  getEvaluations(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(this.url)
  }

  getEvaluation(id: any): Observable<Evaluation> {
    return this.http.get<Evaluation>(`${this.url}?id=${id}`)
  }

  getEvaluationsByWorker(id: any): Observable<Evaluation[]> {
    if (!this.http.get<Evaluation[]>(`${this.url}?idWorker=${id}`)){
      return of([])
    }
    return this.http.get<Evaluation[]>(`${this.url}?idWorker=${id}`)
  }

  getEvaluationsByModel(id: any): Observable<Evaluation[]> {
    if (!this.http.get<Evaluation[]>(`${this.url}?idEvaluationModel=${id}`)){
      return of([])
    }
    return this.http.get<Evaluation[]>(`${this.url}?idEvaluationModel=${id}`)
  }

  updateEvaluation(evaluation: Evaluation): Observable<any> {
    return this.http.patch(this.url, evaluation, httpOptions)
  }

  addEvaluation(evaluation: Evaluation): Observable<Evaluation> {
    return this.http.post<Evaluation>(this.url, evaluation, httpOptions)
  }

  deleteEvaluation(evaluation: Evaluation | number): Observable<Evaluation> {
    const id = typeof evaluation === 'number' ? evaluation: evaluation.id
    return this.http.delete<Evaluation>(`${this.url}?id=${id}`, httpOptions)
  }
}
