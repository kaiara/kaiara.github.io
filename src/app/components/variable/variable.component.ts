import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, Input, OnInit, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-variable',
  templateUrl: './variable.component.html',
  styleUrls: ['./variable.component.scss']
})
export class VariableComponent implements OnInit {
  @Input("variables") variables: Array<any> = [];
  @Output("remove") remove = new EventEmitter();

  isHidden: boolean = true;

  constructor() { }

  ngOnInit(): void {
   
  }
  ngAfterViewChecked(){
  
  }

  removeVariable(index: number) {
    this.remove.emit(index);
  }

  changeType(variable: any, event: any) {
    if (event.target.value == "STRING") {
      variable.value = "";
    } else if (event.target.value == "INTEGER" || event.target.value == "DOUBLE") {
      variable.value = 0;
    } else {
      variable.value = "true";
    }
  }
  
  toggleHidden(){
    this.isHidden = !this.isHidden;
    if(!this.isHidden){
      setTimeout(() => {
        document.getElementById("cod-" + (this.variables.length - 1))?.focus();
      }, 200);
    }
  }
}
