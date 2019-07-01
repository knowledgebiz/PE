import { Injectable } from '@angular/core';

// Development environment:
import { environment } from '../environments/environment'

// Production environment:
// import { environment } from '../environments/environment.prod'


@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {

  public url: string = environment.urlAddress

  constructor() { }
}
