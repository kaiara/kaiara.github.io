import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TerminalComponent } from './components/terminal/terminal.component';
import { VariableComponent } from './components/variable/variable.component';
import { WriteComponent } from './components/write/write.component';
import { OperatorComponent } from './components/operator/operator.component';
import { CommandButtonComponent } from './components/command-button/command-button.component';
import { ConditionalComponent } from './components/conditional/conditional.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ForComponent } from './components/for/for.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent,
    VariableComponent,
    WriteComponent,
    OperatorComponent,
    CommandButtonComponent,
    ConditionalComponent,
    ForComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
