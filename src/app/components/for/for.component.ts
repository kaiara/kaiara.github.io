import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TypesEnum } from 'src/app/enums/types.enum';

@Component({
  selector: 'app-for',
  templateUrl: './for.component.html',
  styleUrls: ['./for.component.scss']
})
export class ForComponent implements OnInit {
  isHidden: boolean = true;
  @Input("text") text: boolean = true;
  @Input("title") title: any;
  @Input("back") back: boolean = false;
  @Input("index") index: any;
  @Input("hasToggle") hasToggle: boolean = true;
  @Input("components") components: any[] = [];
  @Input('variables') variables: any;
  @Input("iconComands") iconComands: boolean = true;

  @Input('for') for: any = {
    variable: '',
    startType: '',
    startValue: '',
    finishType: '',
    finishValue: '',
    incrementType: '',
    incrementValue: '',
    components: []
  };

  forOperator: Array<any> = [];
  commandsPlainText: string = "";

  @Output("remove") remove = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
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

  isFor(component: any) {
    return component.type == TypesEnum.FOR_CODITIONAL
  }

  removeComponent(components: any, index: number) {
    components.splice(index, 1);
  }
  focusFor(index: any) {
    setTimeout(() => {
      let forElement = document.getElementById(`for-op-${this.index}`);

      if (forElement) {
        forElement.focus();
      }
    }, 200);
  }

  clearStartValue() {
    this.for.startValue = '';
  }

  clearFinishValue() {
    this.for.finishValue = '';
  }
  
  removeFor() {
    this.remove.emit(this.index);
  }

  toggleHidden(){
    this.isHidden = !this.isHidden;

    if(!this.isHidden) {
      this.formatCommands();
      setTimeout(() => {
        document.getElementById("for-cod-" + this.index)?.focus();
      }, 200);
    }
    else{
      setTimeout(() => {
        document.getElementById("for-select-" + this.index)?.focus();
      }, 200);
    }
  }

  formatCommands() {
    this.commandsPlainText = `<p class="mb-0">repita_para ${this.for.variable} de ${this.for.variable} ate  ${this.for.variable} passo  ${this.for.incrementType}${this.for.incrementValue} {</p>`;
    this.commandsPlainText += `<p>${this.runCommands(this.for.components)}</p>`;
    this.commandsPlainText += `<p>}</p>`;
  }

  runCommands(components: any) {
    let programComands = "";

    // Other components except variable types
    components.filter((c: any) => c.type != TypesEnum.VARIABLE).forEach((c: any) => {
      if(c.type == TypesEnum.WRITER) {
        if(c.value.type == TypesEnum.VARIABLE) {
          programComands += `&emsp; escreva(${c.value.value}) <br/>`;
        } else {
          programComands += `&emsp; escreva("${c.value.value}") <br/>`;
        }
      }

      if(c.type == TypesEnum.OPERATOR) {
        programComands += `&emsp; ${c.value.reference} <- ${c.value.value} <br/>`;
      }

      if(c.type == TypesEnum.CONDITIONAL) {
        programComands += `&emsp; se ( ${c.value.condition.value} ) { <br/>`;
        programComands += `&emsp; ${this.runCommands(c.value.condition.components)}`;
        programComands += `&emsp; } senao { <br/>`;
        programComands += `&emsp; ${this.runCommands(c.value.nocondition.components)}`;
        programComands += `&emsp; } <br/>`;
      }
    });

    return programComands;
  }
}
