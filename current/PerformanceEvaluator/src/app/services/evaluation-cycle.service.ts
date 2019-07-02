import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { retry, catchError } from 'rxjs/operators'
import { EvaluationCycle } from '../classes/evaluation-cycle'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EvaluationCycleService {

  private url = 'http://127.0.0.1:3000/api/evaluationCycle'

  constructor( private http: HttpClient ) { }

  getCycles(): Observable<EvaluationCycle[]> {
    return this.http.get<EvaluationCycle[]>(this.url)
  }

  getCycle(id: any): Observable<EvaluationCycle> {
    return this.http.get<EvaluationCycle>(`${this.url}?id=${id}`)
  }

  getCycleByDates(startDate: any, endDate: any): Observable<EvaluationCycle> {
    if (!this.http.get<EvaluationCycle>(`${this.url}?startDate=${startDate}&endDate=${endDate}`)){
      return of()
    }
    return this.http.get<EvaluationCycle>(`${this.url}?startDate=${startDate}&endDate=${endDate}`)
  }

  getCyclesByStartDate(startDate: any): Observable<EvaluationCycle[]> {
    if (!this.http.get<EvaluationCycle[]>(`${this.url}?startDate=${startDate}`)){
      return of([])
    }
    return this.http.get<EvaluationCycle[]>(`${this.url}?startDate=${startDate}`)
  }

  getCyclesByEndDate(endDate: any): Observable<EvaluationCycle[]> {
    if (!this.http.get<EvaluationCycle[]>(`${this.url}?endDate=${endDate}`)){
      return of([])
    }
    return this.http.get<EvaluationCycle[]>(`${this.url}?endDate=${endDate}`)
  }

  updateCycle(evaluationCycle: EvaluationCycle): Observable<any> {
    return this.http.patch(this.url, evaluationCycle, httpOptions)
  }

  addCycle(evaluationCycle: EvaluationCycle): Observable<EvaluationCycle> {
    return this.http.post<EvaluationCycle>(this.url, evaluationCycle, httpOptions)
  }

  deleteCycle(evaluationCycle: EvaluationCycle | number): Observable<EvaluationCycle> {
    const id = typeof evaluationCycle === 'number' ? evaluationCycle: evaluationCycle.id
    return this.http.delete<EvaluationCycle>(`${this.url}?id=${id}`, httpOptions)
  }
  
}
