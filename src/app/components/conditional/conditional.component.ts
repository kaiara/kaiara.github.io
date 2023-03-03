import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TypesEnum } from 'src/app/enums/types.enum';

@Component({
  selector: 'app-conditional',
  templateUrl: './conditional.component.html',
  styleUrls: ['./conditional.component.scss']
})
export class ConditionalComponent implements OnInit {
  isHidden: boolean = true;
  @Input("text") text: boolean = true;
  @Input("title") title: any;
  @Input("index") index: any;
  @Input("components") components: any[] = [];
  @Input('variables') variables: any;
  @Input("iconComands") iconComands: boolean = true;
  @Input('conditional') conditional: any = {
    condition: {
      value: '',
      components: [],
    },
    nocondition: {
      components: [],
    },
  };

  conditionals: Array<any> = [];

  @Output("remove") remove = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.clear();
  }

  isVariable(component: any) {
    return component.type == TypesEnum.VARIABLE
  }

  isWriter(component: any) {
    return component.type == TypesEnum.WRITER
  }

  isOperator(component: any) {
    return component.type == TypesEnum.OPERATOR
  }

  isConditional(component: any) {
    return component.type == TypesEnum.CONDITIONAL
  }

  removeComponent(components: any, index: number) {
    components.splice(index, 1);
  }

  getComponentVariables(components: any) {
    return components ? components.filter((c: any) => c.type == TypesEnum.VARIABLE) : [];
  }

  focusConditional(index: any) {
    setTimeout(() => {
      let conditionalElement = document.getElementById(`conditional-op-${index}`);

      if (conditionalElement) {
        conditionalElement.focus();
      }
    }, 200);
  }

  addConditional() {
    this.conditionals.push({
      index: this.conditionals.length,
      type: 'CONDITIONAL',
      value: '',
    });

    this.focusConditional(this.conditionals.length - 1);

    this.conditionals.push({
      index: this.conditionals.length,
      type: '',
      value: '',
    });
  }

  changeInputValue(element : any) {
    element.value = isNaN(element.valueString) ? `"${element.valueString}"` : element.valueString
    this.changeValue();
  }

  changeValue() {
    this.conditional.condition.value = "";
    this.conditionals.forEach(op => {
      this.conditional.condition.value += `${op.value} `;
    });
  }

  changeConditional(element: any, condition: any) {
    element.value = condition;
    this.changeValue();
  }

  toggleHidden(){
    this.isHidden = !this.isHidden;

    if(!this.isHidden){
      setTimeout(() => {
        document.getElementById("conditional-cod-" + this.index)?.focus();
      }, 200);
    }
    else{
      setTimeout(() => {
        document.getElementById("select-var-" + this.index)?.focus();
      }, 200);
    }
 
  }

  removeConditional() {
    this.remove.emit(this.index);
  }

  clear() {
    this.conditionals = [];

    this.conditionals.push({
      index: this.conditionals.length,
      type: '',
      value: '',
    });

    this.focusConditional(this.conditionals.length - 1);
  }

  clearValue(conditional: any) {
    conditional.value = "";
  }
}
