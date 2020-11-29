import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-try-first',
  templateUrl: './try-first.component.html',
  styleUrls: ['./try-first.component.css']
})
export class TryFirstComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {  }

  // TODO : Component 세분화 해서 EventEmitter 사용하기
  changeTryTarget($event, addClassTargetId: string): void {
    const value = $event.target.value;

    const link = document.getElementById('buttonOpenInNewTab');
    link.setAttribute('href', '/' + value);
    const childNodes = Array.from(document.getElementById('trialShortcutKeyword').children);
    for (const child of childNodes) {
      if (child.id === addClassTargetId) {
        child.classList.add('active');
        continue;
      }

      child.classList.remove('active');
    }
  }
}
