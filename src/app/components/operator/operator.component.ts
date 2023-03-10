import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {
  @Input("text") text: boolean = true;
  @Input("title") title: any;
  @Input("index") index: any;
  @Input("hasToggle") hasToggle: boolean = true;
  @Input("components") components: any[] = [];
  @Input('variables') variables: any;
  @Input('operator') operator: any = {
    reference: '',
    value: ''
  };
  
  isHidden: boolean = true;
  operators: Array<any> = [];
  currentVariable: any;

  @Output("remove") remove = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  changeVariable() {
    this.operator.reference = this.currentVariable.name;
    this.operators = [];
  }

  addOperator(type: string, value: string = "") {
    this.operators.push({
      index: this.operators.length,
      type: type,
      value: value,
    });
    this.changeValue();

    this.focusOperator(this.operators.length - 1);
  }

  focusOperator(index: any) {
    setTimeout(() => {
      let operatorElement = document.getElementById(`operator-op-${index}`);

      if (operatorElement) {
        operatorElement.focus();
      }
    }, 200);
  }

  clearOperator(index: any) {
    this.operators.splice(index, 1);
    this.changeValue();
  }

  clearValue(operator: any) {
    operator.value = "";
  }

  changeValue() {
    this.operator.value = "";
    this.operators.forEach(op => {
      this.operator.value += `${op.value} `;
    });
  }

  changeInputValue(operator: any) {
    switch (this.currentVariable.type) {
      case "INTEGER":
        if (!/^[0-9]+$/.test(operator.value)) {
          operator.value = operator.value.substring(0, operator.value.length - 1);
        }
        break;
      case "DOUBLE":
        if (!/^[+-]?\d+((\.|\,)\d+)?$/.test(operator.value)) {
          let lastCharacter = operator.value.substring(operator.value.length - 1, operator.value.length);

          if (lastCharacter != "." && lastCharacter != ",") {
            operator.value = operator.value.substring(0, operator.value.length - 1);
          }
        }
        break;
      default:
        break;
    }

    this.changeValue();
  }

  getVariables() {
    if (this.currentVariable.type == "DOUBLE") {
      return this.variables.filter((v: any) => v.value.type == 'DOUBLE' || v.value.type == 'INTEGER');
    } else {
      return this.variables.filter((v: any) => v.value.type == this.currentVariable.type);
    }
  }

  toggleHidden() {
    this.isHidden = !this.isHidden;

    if (!this.isHidden) {
      setTimeout(() => {
        document.getElementById("operator-cod-" + this.index)?.focus();
      }, 200);
    } else {
      setTimeout(() => {
        document.getElementById("select-var-" + this.index)?.focus();
      }, 200);
    }

  }

  removeOperator() {
    this.remove.emit(this.index);
  }
}
