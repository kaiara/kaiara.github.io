import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TypesEnum } from 'src/app/enums/types.enum';

@Component({
  selector: 'app-command-button',
  templateUrl: './command-button.component.html',
  styleUrls: ['./command-button.component.scss']
})
export class CommandButtonComponent implements OnInit {
  @Input("mode") mode: any = "block";
  @Input("text") text: boolean = true;
  @Input("hasVariables") hasVariables: boolean = true;
  @Input("iconComands") iconComands: boolean = true;
  @Input("title") title: any;
  @Input("components") components: any[] = [];
  @Input("variables") variables: any[] = [];
  @Input("writers") writers: any[] = [];
  @Input("operators") operators: any[] = [];
  @Input("conditionals") conditionals: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addVariable() {
    const variable = {
      name: 'var' + this.variables.length,
      value: '0',
      type: "INTEGER"
    }

    const component = {
      type: TypesEnum.VARIABLE,
      value: variable
    }

    this.components.push(component);

    setTimeout(() => {
      document.getElementById("variable-type-" + (this.components.length - 1))?.focus();
    }, 100);
  }

  addWriter() {
    const writer = {
      type: '',
      value: ''
    };

    const component = {
      type: TypesEnum.WRITER,
      value: writer
    }

    this.components.push(component);

    setTimeout(() => {
      document.getElementById("write-type-" + (this.components.length - 1))?.focus();
    }, 100);
  }

  addOperator() {
    const operator = {
      name: '',
      value: ''
    };

    const component = {
      type: TypesEnum.OPERATOR,
      value: operator
    }

    this.components.push(component);

    setTimeout(() => {
      document.getElementById("select-var-" + (this.components.length - 1))?.focus();
    }, 100);
  }

  addConditional(){
    const conditional = {
      condition: {
        value: '',
        components: [],
      },
      nocondition: {
        components: [],
      },
    };

    const component = {
      type: TypesEnum.CONDITIONAL,
      value: conditional
    }

    this.components.push(component);

    setTimeout(() => {
      document.getElementById("button-op-" + (this.components.length - 1))?.focus();
    }, 100);
  }

}
