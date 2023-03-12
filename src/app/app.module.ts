import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent,
    VariableComponent,
    WriteComponent,
    OperatorComponent,
    CommandButtonComponent,
    ConditionalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
