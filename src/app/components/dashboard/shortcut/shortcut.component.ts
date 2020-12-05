import { Component, OnInit } from '@angular/core';
import {ConnectedApplication} from './ConnectedApplication';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.css']
})
export class ShortcutComponent implements OnInit {

  connectedApplications: ConnectedApplication[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
