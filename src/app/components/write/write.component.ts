import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {
  isHidden: boolean = true;

  @Input("index") index: any;
  @Input("components") components: any[] = [];
  @Input('variables') variables: any;
  @Input('writer') writer: any = {
    type: '',
    value: ''
  };

  @Output("remove") remove = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  changeType() {
    this.writer.value = '';
  }

  toggleHidden(){
    this.isHidden = !this.isHidden;

    if(!this.isHidden){
      setTimeout(() => {
        document.getElementById("writer-cod-" + this.index)?.focus();
      }, 200);
    }
  }

  removeWriter() {
    this.remove.emit(this.index);
  }
}
