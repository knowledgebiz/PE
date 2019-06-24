import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { retry, catchError } from 'rxjs/operators'
import { AnswerType } from './answer-type'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AnswerTypeService {

  private url = 'http://127.0.0.1:3000/api/answerType'

  constructor( private http: HttpClient) { }

  getAnswerTypes(): Observable<AnswerType[]> {
    return this.http.get<AnswerType[]>(this.url)
  }

  getAnswerType(id: any): Observable<AnswerType> {
    return this.http.get<AnswerType>(`${this.url}?id=${id}`)
  }

  getAnswerTypesByTerm(term: any): Observable<AnswerType[]> {
    if (!this.http.get<AnswerType[]>(`${this.url}?type=${term}`)){
      return of([])
    }
    return this.http.get<AnswerType[]>(`${this.url}?type=${term}`)
  }

  updateAnswerType(answerType: AnswerType): Observable<any> {
    return this.http.patch(this.url, answerType, httpOptions)
  }

  addAnswerType(answerType: AnswerType): Observable<AnswerType> {
    return this.http.post<AnswerType>(this.url, answerType, httpOptions)
  }

  deleteAnswerType(answerType: AnswerType | number): Observable<AnswerType> {
    const id = typeof answerType === 'number' ? answerType: answerType.id
    return this.http.delete<AnswerType>(`${this.url}?id=${id}`, httpOptions)
  }
}