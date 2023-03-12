import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {
  isHidden: boolean = true;
  @Input("text") text: boolean = true;
  @Input("back") back: boolean = false;
  @Input("title") title: any;
  @Input("index") index: any;
  @Input("hasToggle") hasToggle: boolean = true;
  @Input("components") components: any[] = [];
  @Input('variables') variables: any;
  @Input('writer') writer: any = {
    type: '',
    value: ''
  };

  @Output("remove") remove = new EventEmitter();

  idElement: any;

  constructor() {
    
  }

  ngOnInit(): void {
    this.idElement = Math.floor(Math.random() * (this.index + 1) * 10000);

    setTimeout(() => {
      document.getElementById("write-type-" + this.idElement)?.focus();
    }, 200);
  }

  changeType() {
    this.writer.value = '';
  }

  toggleHidden(){
    this.isHidden = !this.isHidden;

    if(!this.isHidden){
      setTimeout(() => {
        document.getElementById("writer-cod-" + this.idElement)?.focus();
      }, 200);
    }
  }

  removeWriter() {
    this.remove.emit(this.index);
  }
}
