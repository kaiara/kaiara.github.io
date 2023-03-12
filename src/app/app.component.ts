import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { TypesEnum } from './enums/types.enum';
declare var vcat: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ivprog';
  private pressedAlt: boolean = false;
  components: Array<any> = [];
  isRunning: boolean = false;

  @ViewChildren('input') inputs!: QueryList<ElementRef>;

  getVariables() {
    return this.components ? this.components.filter(c => c.type == TypesEnum.VARIABLE) : [];
  }

  getWriters() {
    return this.components ? this.components.filter(c => c.type == TypesEnum.WRITER) : [];
  }

  getOperators() {
    return this.components ? this.components.filter(c => c.type == TypesEnum.OPERATOR) : [];
  }

  getConditionals() {
    return this.components ? this.components.filter(c => c.type == TypesEnum.CONDITIONAL) : [];
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

  removeComponent(index: number) {
    this.components.splice(index, 1);
  }

  clear() {
    this.components = [];
  }

  runCommands(components: any) {
    let programComands = "";

    // Only variables first
    components.filter((c: any) => c.type == TypesEnum.VARIABLE).forEach((c: any) => {
      switch (c.value.type) {
        case "INTEGER":
          programComands += `inteiro ${c.value.name} <- ${c.value.value} \n`;
          break;
        case "DOUBLE":
          programComands += `real ${c.value.name} <- ${c.value.value} \n`;
          break;
        case "BOOLEAN":
          programComands += `logico ${c.value.name} <- ${c.value.value} \n`;
          break;
        case "STRING":
          programComands += `cadeia ${c.value.name} <- "${c.value.value}" \n`;
          break;
        default:
          break;
      }
    });

    // Other components except variable types
    components.filter((c: any) => c.type != TypesEnum.VARIABLE).forEach((c: any) => {
      if(c.type == TypesEnum.WRITER) {
        if(c.value.type == TypesEnum.VARIABLE) {
          programComands += `escreva(${c.value.value}) \n`;
        } else {
          programComands += `escreva("${c.value.value}") \n`;
        }
      }

      if(c.type == TypesEnum.OPERATOR) {
        programComands += `${c.value.reference} <- ${c.value.value} \n`;
      }

      if(c.type == TypesEnum.CONDITIONAL) {
        programComands += `se ( ${c.value.condition.value} ) { \n`;
        programComands += this.runCommands(c.value.condition.components);
        programComands += `} senao { \n`;
        programComands += this.runCommands(c.value.nocondition.components);
        programComands += `} \n`;
      }
    });

    return programComands;
  }

  run() {
    let programComands = this.runCommands(this.components);

    let programSintax = `
    programa { 
      funcao vazio inicio () { 
        ${programComands}
      } 
    }`;

    // Exemplo de uso
    // programSintax = `programa {
    //   funcao inicio () {
    //     inteiro a <- 0
    //     para a de 0 ate 10 {
    //       se (a%2 == 0) {
    //         escreva("eh par: "+a)
    //       }
    //     }
    //   }
    // }
    // `;

    // programSintax = `programa {
    //   funcao inicio () {
    //     inteiro a <- 0
    //     inteiro b <- 1
    //     inteiro c <- 2

    //     a <- b + c
    //     escreva("aqui: " + a)
    //   }
    // }
    // `;

    console.log(programSintax);

    this.isRunning = true;

    try {
      this.clearTerminal();
      const ast = vcat.SemanticAnalyser.analyseFromSource(programSintax);
      const proc = new vcat.IVProgProcessor(ast);
      // Registrando um objeto que fornece o minimo necessário para o processador
      // Vê: src/io/ouput.js
      proc.registerOutput({
        sendOutput: this.terminalOutput,
      });
      // IVProgProcessor.interpretAST é uma função assíncrona
      // Ela devolve o estado final do programa (valores finais das variáveis declaradas dentro da função "inicio" ou no escopo global)
      // A classe Store em src/processor/store/store.ts descreve o parametro mas no contexto atual ele é totalmente irrelevante
      proc.interpretAST().then((_finalProgramState: any) => {
        console.log("Programa executado com sucesso!")
      });
    } catch (error: any) {
      // Caso haja erro de sintaxe ou semântico, antes ou durante a interpretação do código uma exceção será lançada
      // Todo objeto error derivado dos erros citados acima possuem esses campos definidos
      // Adicionei a pedido da ultima pessoa que trabalho com essa integração da interface acessível
      // Caso o objeto error nao possua essas propriedades, algo bastante inexperado aconteceu e deve indicar problema interno 
      // Vê: src/ast/error/syntaxError.js, src/processor/error/runtimeError.js, src/processor/error/semanticError.js e seus respectivos factories
      // NOTA: Em alguns casos a informação de linha e coluna podem nao estar disponivel
      // id representa o identificador unico do erro, linha e coluna onde no codigo textual ocorreu o problema
      if (error.id && error.context)
        console.error(error.id, error.context.line, error.context.column);
      else
        console.error(error)

      this.terminalOutput(error.message);
      // a linha e coluna foi a estrategia pensada para poder associar o erro com o elemento visual que o gerou
      // uma vez que seria possivel associar seções do texto com o elemento que o gerou
    }
  }

  terminalOutput(valor: any) {
    setTimeout(() => {
      let terminalElement = document.getElementById("terminalOutput");
      let textTerminal = document.getElementById("textTerminal");

      if (terminalElement && textTerminal) {
        let terminalContent =  terminalElement.innerHTML;
        terminalContent += `<p>${valor}</p>`;
        terminalElement.innerHTML = terminalContent;
        textTerminal.focus();
      }
    }, 200);
  }

  clearTerminal() {
    setTimeout(() => {
      let terminalElement = document.getElementById("terminalOutput");

      if (terminalElement) {
        terminalElement.innerHTML = "";
      }
    }, 200);
  }

  goToComands() {
    document.getElementById('comands')?.focus();
  }

  goToStart() {
    document.getElementById('inicio')?.focus();
  }

  goToTerminal() {
    document.getElementById('title-terminal')?.focus();
  }

  @HostListener("window:keydown", ["$event"]) onKeyDown(event: KeyboardEvent) {
    if (event.altKey && event.code == "KeyI") {
      this.goToStart();
      this.pressedAlt = false;
    }

    if (event.altKey && event.code == "KeyC") {
      this.goToComands();
      this.pressedAlt = false;
    }

    if (event.altKey && event.code == "KeyT") {
      this.goToTerminal();
      this.pressedAlt = false;
    }
  }
}



