import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {
  isHidden: boolean = true;

  @Input("index") index: any;
  @Input('variables') variables: any;
  @Input('operator') operator: any = {
    name: '',
    value: ''
  };

  operators: Array<any> = [];

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

  changeType(index: any) {
    this.focusOperator(index);
  }

  changeVariable() {
    this.operators = [];

    this.operators.push({
      index: this.operators.length,
      type: '',
      value: '',
    });

    this.focusOperator(this.operators.length - 1);
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

  changeValue(value: any) {
    this.operator.value += `${value} `;
  }

  toggleHidden(){
    this.isHidden = !this.isHidden;

    if(!this.isHidden){
      setTimeout(() => {
        document.getElementById("operator-cod-" + this.index)?.focus();
      }, 200);
    }
  }

  removeOperator() {
    this.remove.emit(this.index);
  }

}
