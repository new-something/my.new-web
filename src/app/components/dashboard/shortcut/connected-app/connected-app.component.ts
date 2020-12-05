import {Component, Input, OnInit} from '@angular/core';
import {ConnectedApplication} from '../ConnectedApplication';

@Component({
  selector: 'app-connected-app',
  templateUrl: './connected-app.component.html',
  styleUrls: ['./connected-app.component.css']
})
export class ConnectedAppComponent implements OnInit {
  @Input()
  connectedApplication: ConnectedApplication;

  constructor() { }

  ngOnInit(): void {
  }

}
