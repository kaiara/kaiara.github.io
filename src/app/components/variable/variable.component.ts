import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-variable',
  templateUrl: './variable.component.html',
  styleUrls: ['./variable.component.scss']
})
export class VariableComponent implements OnInit {
  @Input("text") text: boolean = true;
  @Input("title") title: any;
  @Input("index") index: any;
  @Input("hasToggle") hasToggle: boolean = true;
  @Input("variable") variable: any;
  @Input("components") components: any[] = [];
  @Input("variables") variables: any[] = [];
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
      this.variable.value = "verdadeiro";
    }
  }
  
  toggleHidden(){
    this.isHidden = !this.isHidden;

    if(!this.isHidden){
      setTimeout(() => {
        document.getElementById("variable-cod-" + this.index)?.focus();
      }, 200);
    }
    else{
      setTimeout(() => {
        document.getElementById("variable-type-" + this.index)?.focus();
      }, 200);
    }
  }
}
