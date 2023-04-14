import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(public translate: TranslateService) { }

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
    const currentLang = "pt";
    this.commandsPlainText = `<p class="mb-0">${currentLang == 'pt' ? 'repita_para' : 'repeat_for'} ${this.for.variable} ${currentLang == 'pt' ? 'de' : 'from'} ${this.for.variable} <span tabindex="-1">${currentLang == 'pt' ? 'ate' : 'to'}</span>  ${this.for.variable} ${currentLang == 'pt' ? 'passo' : 'pass'} ${this.for.incrementType}${this.for.incrementValue} {</p>`;
    this.commandsPlainText += `<p>${this.runCommands(this.for.components)}</p>`;
    this.commandsPlainText += `<p>}</p>`;
  }

  runCommands(components: any) {
    const currentLang = "pt";
    let programComands = "";

    // Other components except variable types
    components.filter((c: any) => c.type != TypesEnum.VARIABLE).forEach((c: any) => {
      if(c.type == TypesEnum.WRITER) {
        if(c.value.type == TypesEnum.VARIABLE) {
          programComands += `&emsp; ${currentLang == 'pt' ? 'escreva' : 'write'}(${c.value.value}) <br/>`;
        } else {
          programComands += `&emsp; ${currentLang == 'pt' ? 'escreva' : 'write'}("${c.value.value}") <br/>`;
        }
      }

      if(c.type == TypesEnum.OPERATOR) {
        programComands += `&emsp; ${c.value.reference} <- ${c.value.value} <br/>`;
      }

      if(c.type == TypesEnum.CONDITIONAL) {
        programComands += `&emsp; ${currentLang == 'pt' ? 'se' : 'if'} ( ${c.value.condition.value} ) { <br/>`;
        programComands += `&emsp; ${this.runCommands(c.value.condition.components)}`;
        programComands += `&emsp; } ${currentLang == 'pt' ? 'senao' : 'else'} { <br/>`;
        programComands += `&emsp; ${this.runCommands(c.value.nocondition.components)}`;
        programComands += `&emsp; } <br/>`;
      }

      if(c.type == TypesEnum.FOR_CODITIONAL) {
        programComands += `&emsp; ${currentLang == 'pt' ? 'repita_para' : 'repeat_for'} ${c.value.variable} ${currentLang == 'pt' ? 'de' : 'from'} ${c.value.startValue} ${currentLang == 'pt' ? 'ate' : 'to'} ${c.value.finishValue} ${currentLang == 'pt' ? 'passo' : 'pass'} ${c.value.incrementType}${c.value.incrementValue} { <br/>`;
        programComands += `&emsp; ${this.runCommands(c.value.components)}`;
        programComands += `&emsp; } <br/>`;
      }
    });

    return programComands;
  }
}
