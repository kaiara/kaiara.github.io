import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
declare var vcat: any;

const VARIABLE = "VARIABLE";
const WRITER = "WRITER";
const OPERATOR = "OPERATOR";

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
    return this.components ? this.components.filter(c => c.type == VARIABLE) : [];
  }

  getWriters() {
    return this.components ? this.components.filter(c => c.type == WRITER) : [];
  }

  getOperators() {
    return this.components ? this.components.filter(c => c.type == OPERATOR) : [];
  }

  isVariable(component: any) {
    return component.type == VARIABLE
  }

  isWriter(component: any) {
    return component.type == WRITER
  }

  isOperator(component: any) {
    return component.type == OPERATOR
  }

  addVariable() {
    const variable = {
      name: 'var' + this.getVariables().length,
      value: '0',
      type: "INTEGER"
    }

    const component = {
      type: VARIABLE,
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
      type: WRITER,
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
      type: OPERATOR,
      value: operator
    }

    this.components.push(component);

    setTimeout(() => {
      document.getElementById("select-var-" + (this.components.length - 1))?.focus();
    }, 100);
  }

  removeComponent(index: number) {
    this.components.splice(index, 1);
  }

  clear() {
    this.components = [];
  }

  run() {
    let programComands = "";

    // Only variables first
    this.components.filter(c => c.type == VARIABLE).forEach(c => {
      switch (c.value.type) {
        case "INTEGER":
          programComands += `inteiro ${c.value.name} <- ${c.value.value} \n`;
          break;
        default:
          break;
      }
    });

    // Other components except variable types
    this.components.filter(c => c.type != VARIABLE).forEach(c => {
      if(c.type == WRITER) {
        if(c.value.type == VARIABLE) {
          programComands += `escreva(${c.value.value}) \n`;
        } else {
          programComands += `escreva("${c.value.value}") \n`;
        }
      }

      if(c.type == OPERATOR) {
        programComands += `${c.value.name} <- ${c.value.value} \n`;
      }
    });

    let programSintax = `
    programa { 
      funcao inicio () { 
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



