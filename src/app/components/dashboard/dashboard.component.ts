import {Component, OnInit} from '@angular/core';
import {MyInfoService} from '../../services/my-info.service';
import {MyInfo} from '../../models/my-info';
import {CommandAppListModal} from '../../commands/command-app-list-modal';
import {ModalEventService} from '../../services/modal/modal-event.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  myInfo: MyInfo;

  constructor(private myInfoService: MyInfoService, private modalEventService: ModalEventService) { }

  ngOnInit(): void {
    this.modalEventService.updateOpenAppListModal(new CommandAppListModal('ALL', true));
    this.myInfoService.myInfo().subscribe((data) => {
      this.myInfo = data;
    });
  }

}
