import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login/Login.service';
import swal from 'sweetalert2';
import {CommonService} from '../common/Common.service';

@Component({
  selector: 'app-home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})

export class HomeComponent implements OnInit {
  private lastLogin: any;
  public showLoad: boolean;
  public pending: boolean;
  public approved: boolean;
  public rejected: boolean;
  constructor(private loginService: LoginService, private commonService: CommonService) {
    this.showLoad = true;
    this.pending = true;
    this.approved = true;
    this.rejected = true;
    this.lastLogin = new Date();
  }
  ngOnInit(): void {
    setTimeout (() => {
      this.showLoad = false;
    }, 3000);
  }

  private pendingClick() {
    this.pending = false;
  }
  private approvedClick() {
    this.approved = false;
  }
  private rejectedClick() {
    this.rejected = false;
  }
  private homeClick() {
    swal({
      backdrop: false,
      type: 'warning',
      title: 'This is Home',
      text: '. . . . . . . . . . . .'
    });
  }
  private viewAllClick() {
    this.commonService.navigateToViewAll();
  }
}


