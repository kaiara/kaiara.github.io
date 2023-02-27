import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {
  isHidden: boolean = true;
  @Input("text") text: boolean = true;
  @Input("title") title: any;
  @Input("index") index: any;
  @Input("components") components: any[] = [];
  @Input('variables') variables: any;
  @Input('operator') operator: any = {
    name: '',
    value: ''
  };

  operators: Array<any> = [];

  currentVariable: any;

  @Output("remove") remove = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  focusOperator(index: any) {
    setTimeout(() => {
      let operatorElement = document.getElementById(`operator-op-${index}`);

      if (operatorElement) {
        operatorElement.focus();
      }
    }, 200);
  }

  getVariables() {
    return this.variables.filter((v: any) => v.value.type == this.currentVariable.type);
  }

  changeType(index: any) {
    this.focusOperator(index);
  }

  changeVariable() {
    this.operator.name = this.currentVariable.name;

    this.operators = [];

    this.operators.push({
      index: this.operators.length,
      type: '',
      value: '',
    });
  }

  addOperator() {
    this.operators.push({
      index: this.operators.length,
      type: 'OPERATOR',
      value: '',
    });

    this.focusOperator(this.operators.length - 1);

    this.operators.push({
      index: this.operators.length,
      type: '',
      value: '',
    });
  }

  changeInputValue(operator : any) {
    switch (this.currentVariable.type) {
      case "INTEGER":
        if(!/^[0-9]+$/.test(operator.value)) {
          operator.value = operator.value.substring(0, operator.value.length - 1);
        }
        break;
      case "DOUBLE":
        if(!/^[+-]?\d+((\.|\,)\d+)?$/.test(operator.value)) {
          let lastCharacter = operator.value.substring(operator.value.length - 1, operator.value.length);

          if(lastCharacter != "." && lastCharacter != ",") {
            operator.value = operator.value.substring(0, operator.value.length - 1);
          }
        }
        break;
      default:
        break;
    }

    this.changeValue();
  }

  changeValue() {
    this.operator.value = "";
    this.operators.forEach(op => {
      this.operator.value += `${op.value} `;
    });

    console.log(this.operator)
  }

  toggleHidden(){
    this.isHidden = !this.isHidden;

    if(!this.isHidden){
      setTimeout(() => {
        document.getElementById("operator-cod-" + this.index)?.focus();
      }, 200);
    }
    else{
      setTimeout(() => {
        document.getElementById("select-var-" + this.index)?.focus();
      }, 200);
    }
 
  }

  removeOperator() {
    this.remove.emit(this.index);
  }

  clear(operator: any) {
    operator.type = "";
    operator.value = "";
    this.focusOperator(operator.index);
  }

  clearValue(operator: any) {
    operator.value = "";
  }

}
