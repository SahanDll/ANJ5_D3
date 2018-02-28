import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import swal from 'sweetalert2';
import {CommonService} from '../../common/Common.service';
import {LoginService} from '../../login/Login.service';

@Component({
  selector: 'app-notification',
  templateUrl: './Notification.component.html',
  styleUrls: ['./Notification.component.css', '../../home/Home.component.css']
})

export class NotificationComponent implements OnInit {
  private _insertStock: string;
  constructor(private loginService: LoginService, private commonService: CommonService) {
  }
  ngOnInit(): void {
  }
  get insertStock(): string {
    return this._insertStock;
  }

  @Input() set insertStock(value: string) {
    this._insertStock = value;
    if (this._insertStock.length >= 3) {
      swal({
        backdrop: false,
        type: 'warning',
        title: this._insertStock,
        text: '. . . . . . . . . . . .'
      });
    }
  }
  private keyDownFunction(event) {
    if (event.keyCode === 13) {
      if (this._insertStock.length >= 3) {
        swal({
          backdrop: false,
          type: 'warning',
          title: this._insertStock,
          text: '. . . . . . . . . . . .'
        });
      } else {
        swal({
          backdrop: false,
          type: 'warning',
          title: 'Enter at least 3 characters',
          text: '. . . . . . . . . . . .'
        });
      }
    }
  }
  private homeClick() {
    this.commonService.navigateToHome();
  }
  private viewAllClick() {
    swal({
      backdrop: false,
      type: 'warning',
      title: 'This is View All',
      text: '. . . . . . . . . . . .'
    });
  }
}
