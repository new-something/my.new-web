import {Component, Input, OnInit} from '@angular/core';
import {ConnectedApp} from '../../../../models/connected-app';

@Component({
  selector: 'app-connected-app',
  templateUrl: './connected-app.component.html',
  styleUrls: ['./connected-app.component.css']
})
export class ConnectedAppComponent implements OnInit {
  @Input()
  connectedApp: ConnectedApp;

  constructor() { }

  ngOnInit(): void {
    console.log('ConnectedAppComponent! Init!');
    console.log(this.connectedApp);
  }

}
