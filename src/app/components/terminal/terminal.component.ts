import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {
  @Input('isRunning') isRunning: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
}
