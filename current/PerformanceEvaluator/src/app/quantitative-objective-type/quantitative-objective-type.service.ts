import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { retry, catchError } from 'rxjs/operators'
import { QuantitativeObjectiveType } from './quantitative-objective-type'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class QuantitativeObjectiveTypeService {

  private url = 'http://127.0.0.1:3000/api/objectiveType'

  constructor( private http: HttpClient) { }

  getObjectiveTypes(): Observable<QuantitativeObjectiveType[]> {
    return this.http.get<QuantitativeObjectiveType[]>(this.url)
  }

  getObjectiveType(id: any): Observable<QuantitativeObjectiveType> {
    return this.http.get<QuantitativeObjectiveType>(`${this.url}?id=${id}`)
  }

  getObjectiveTypesByTerm(term: any): Observable<QuantitativeObjectiveType[]> {
    if (!this.http.get<QuantitativeObjectiveType[]>(`${this.url}?type=${term}`)){
      return of([])
    }
    return this.http.get<QuantitativeObjectiveType[]>(`${this.url}?type=${term}`)
  }

  updateObjectiveType(objectiveType: QuantitativeObjectiveType): Observable<any> {
    return this.http.patch(this.url, objectiveType, httpOptions)
  }

  addObjectiveType(objectiveType: QuantitativeObjectiveType): Observable<QuantitativeObjectiveType> {
    return this.http.post<QuantitativeObjectiveType>(this.url, objectiveType, httpOptions)
  }

  deleteObjectiveType(objectiveType: QuantitativeObjectiveType | number): Observable<QuantitativeObjectiveType> {
    const id = typeof objectiveType === 'number' ? objectiveType: objectiveType.id
    return this.http.delete<QuantitativeObjectiveType>(`${this.url}?id=${id}`, httpOptions)
  }
}
