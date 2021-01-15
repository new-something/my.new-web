import {Component, OnInit} from '@angular/core';
import {MyInfoService} from '../../services/my-info.service';
import {MyInfo} from '../../models/my-info';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  myInfo: MyInfo;

  constructor(private myInfoService: MyInfoService) { }

  ngOnInit(): void {
    this.myInfoService.myInfo().subscribe((data) => {
      console.log(data);
      this.myInfo = data;
    });
  }

}
