import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { retry, catchError } from 'rxjs/operators'

export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = ''
                    if (error.error instanceof ErrorEvent) {
                        errorMessage = `ERROR\n${error.error.message}`
                    }
                    else {
                        errorMessage = `ERROR\nStatus code: ${error.status}\nError Message: ${error.message}`
                    }
                    console.log(errorMessage)
                    return throwError(errorMessage)
                })
            )
    }
}
