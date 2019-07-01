import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpErrorInterceptor } from './http-error-interceptor/http-error.interceptor'
import { EnvironmentUrlService } from './environment-url.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms'
import { CdkTableModule } from '@angular/cdk/table'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatTableModule } from '@angular/material/table'
import { MatInputModule} from '@angular/material/input'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSliderModule } from '@angular/material/slider'
import { MatRadioModule } from '@angular/material/radio'

import { EvaluationFormsComponent } from './components/evaluation-forms/evaluation-forms.component'
import 'hammerjs';
import { FormListComponent } from './components/form-list/form-list.component';
import { CreateCompetenciesComponent } from './components/create-competencies/create-competencies.component'

@NgModule({
  declarations: [
    AppComponent,
    EvaluationFormsComponent,
    FormListComponent,
    CreateCompetenciesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CdkTableModule,
    MatFormFieldModule,
    MatTableModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSliderModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [
    EnvironmentUrlService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
