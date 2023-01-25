import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-variable',
  templateUrl: './variable.component.html',
  styleUrls: ['./variable.component.scss']
})
export class VariableComponent implements OnInit {
  @Input("variable") variable: any;
  @Input("index") index: any;
  @Output("remove") remove = new EventEmitter();

  isHidden: boolean = true;

  constructor() { }

  ngOnInit(): void {
   
  }

  removeVariable() {
    this.remove.emit(this.index);
  }

  changeType(event: any) {
    if (event.target.value == "STRING") {
      this.variable.value = "";
    } else if (event.target.value == "INTEGER" || event.target.value == "DOUBLE") {
      this.variable.value = 0;
    } else {
      this.variable.value = "true";
    }
  }
  
  toggleHidden(){
    this.isHidden = !this.isHidden;

    if(!this.isHidden){
      setTimeout(() => {
        document.getElementById("variable-cod-" + this.index)?.focus();
      }, 200);
    }
  }
}
