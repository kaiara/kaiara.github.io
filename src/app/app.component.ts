import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ivprog';
  variables: Array<any> = [];
  @ViewChildren('input') inputs!: QueryList<ElementRef>;


  addVariable() {
    this.variables.push({
      name: 'var' + this.variables?.length,
      value: '0',
      type: "INTEGER"
    });
    setTimeout(() => {
      document.getElementById("variable-type-" + (this.variables.length - 1))?.focus();
    }, 200);
  }
  removeVariable(index: number) {
    this.variables.splice(index, 1);
  }

  clear(){
    this.variables = [];
  }

  goToComands() {
    document.getElementById('comands')?.focus();
  }

  goToStart() {
    document.getElementById('inicio')?.focus();
  }

  goToTerminal() {
    document.getElementById('title-terminal')?.focus();
  }
  
}



