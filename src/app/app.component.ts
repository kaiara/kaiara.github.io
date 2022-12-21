import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ivprog';
  variables: Array<any> = [];
  private pressedAlt: boolean = false;

  @ViewChildren('input') inputs!: QueryList<ElementRef>;

  @HostListener("window:keydown", ["$event"]) onKeyDown(event: KeyboardEvent) {

    if (event.altKey && event.code == "KeyI") {
      this.goToStart();
      this.pressedAlt = false;
    }

    if (event.altKey && event.code == "KeyT") {
      this.goToComands();
      this.pressedAlt = false;
    }

    if (event.altKey && event.code == "KeyC") {
      this.goToTerminal();
      this.pressedAlt = false;
    }
  }
  
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



