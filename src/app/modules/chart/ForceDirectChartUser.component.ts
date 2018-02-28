import {Component, OnInit, OnChanges, ViewChild, ElementRef, Input, AfterViewChecked} from '@angular/core';
import swal from 'sweetalert2';
import {ForceDirectedChartBaseComponent} from './ForceDirectChartBase.component';
import {UserModelComponent} from '../model/UserModel.component';
import {CommonService} from '../common/Common.service';

@Component({
  selector: 'app-force-directed-chart-user',
  styleUrls: ['./ForceDirectChart.component.scss'],
  template: `
    <div [class]='"force-directed-chart-user " + class' #forceDirectedChartContainer (click)="nodeClick(node)">

      <div class='tooltip' style="position: fixed">
        <div *ngIf='node?.model === "UserAll"'>
          <div fxLayout='row' fxLayoutAlign='start center' class='header'>
            <img src='../../../assets/user.png' alt='User Icon'>
            <div fxLayout='column' fxLayoutAlign='center start'>
              <div class='title'>{{node?.vendor}}</div>
              <div>{{node?.model}}</div>
            </div>
          </div>
          <div fxLayout='column' fxLayoutAlign='center start' class='body'>
            <div class='subtitle'>Name</div>
            <div>{{node?.name}}</div>
            <div class='subtitle'>IP</div>
            <div>{{node?.address}}</div>
            <div class='subtitle'>Protocol</div>
            <div>{{node?.protocol}}</div>
          </div>
        </div>
        <div *ngIf='node?.model === "User"'>
          <div fxLayout='row' fxLayoutAlign='start center' class='header'>
            <img src='../../../assets/user.png' alt='User Icon'>
            <div fxLayout='column' fxLayoutAlign='center start'>
              <div class='title'>{{node?.vendor}}</div>
              <div>{{node?.model}}</div>
            </div>
          </div>
          <div fxLayout='column' fxLayoutAlign='center start' class='body'>
            <div class='subtitle'>Name</div>
            <div>{{node?.name}}</div>
            <div class='subtitle'>IP</div>
            <div>{{node?.address}}</div>
            <div class='subtitle'>Protocol</div>
            <div>{{node?.protocol}}</div>
          </div>
        </div>
        <div *ngIf='node?.model === "Login"'>
          <div fxLayout='row' fxLayoutAlign='start center' class='header'>
            <img src='../../../assets/user.png' alt='User Icon'>
            <div fxLayout='column' fxLayoutAlign='center start'>
              <div class='title'>{{node?.vendor}}</div>
              <div>{{node?.model}}</div>
            </div>
          </div>
          <div fxLayout='column' fxLayoutAlign='center start' class='body'>
            <div class='subtitle'>Location</div>
            <div>{{node?.name}}</div>
            <div class='subtitle'>IP</div>
            <div>{{node?.address}}</div>
            <div class='subtitle'>Protocol</div>
            <div>{{node?.protocol}}</div>
          </div>
        </div>
        <div *ngIf='node?.model === "Engage"'>
          <div fxLayout='row' fxLayoutAlign='start center' class='header'>
            <img src='../../../assets/user.png' alt='User Icon'>
            <div fxLayout='column' fxLayoutAlign='center start'>
              <div class='title'>{{node?.vendor}}</div>
              <div>{{node?.model}}</div>
            </div>
          </div>
          <div fxLayout='column' fxLayoutAlign='center start' class='body'>
            <div class='subtitle'>Screen</div>
            <div>{{node?.name}}</div>
            <div class='subtitle'>IP</div>
            <div>{{node?.address}}</div>
            <div class='subtitle'>Protocol</div>
            <div>{{node?.protocol}}</div>
          </div>
        </div>
        <div *ngIf='node?.model === "View"'>
          <div fxLayout='row' fxLayoutAlign='start center' class='header'>
            <img src='../../../assets/user.png' alt='User Icon'>
            <div fxLayout='column' fxLayoutAlign='center start'>
              <div class='title'>{{node?.vendor}}</div>
              <div>{{node?.model}}</div>
            </div>
          </div>
          <div fxLayout='column' fxLayoutAlign='center start' class='body'>
            <div class='subtitle'>Screen Move</div>
            <div>{{node?.name}}</div>
            <div class='subtitle'>IP</div>
            <div>{{node?.address}}</div>
            <div class='subtitle'>Protocol</div>
            <div>{{node?.protocol}}</div>
          </div>
        </div>
        <div *ngIf='node?.model === "Download"'>
          <div fxLayout='row' fxLayoutAlign='start center' class='header'>
            <img src='../../../assets/user.png' alt='User Icon'>
            <div fxLayout='column' fxLayoutAlign='center start'>
              <div class='title'>{{node?.vendor}}</div>
              <div>{{node?.model}}</div>
            </div>
          </div>
          <div fxLayout='column' fxLayoutAlign='center start' class='body'>
            <div class='subtitle'>App Version</div>
            <div>{{node?.name}}</div>
            <div class='subtitle'>IP</div>
            <div>{{node?.address}}</div>
            <div class='subtitle'>Protocol</div>
            <div>{{node?.protocol}}</div>
          </div>
        </div>
        <div *ngIf='node?.model === "Using"'>
          <div fxLayout='row' fxLayoutAlign='start center' class='header'>
            <img src='../../../assets/user.png' alt='User Icon'>
            <div fxLayout='column' fxLayoutAlign='center start'>
              <div class='title'>{{node?.vendor}}</div>
              <div>{{node?.model}}</div>
            </div>
          </div>
          <div fxLayout='column' fxLayoutAlign='center start' class='body'>
            <div class='subtitle'>Device</div>
            <div>{{node?.name}}</div>
            <div class='subtitle'>IP</div>
            <div>{{node?.address}}</div>
            <div class='subtitle'>Protocol</div>
            <div>{{node?.protocol}}</div>
          </div>
        </div>
      </div>
    </div>
  `
})

export class ForceDirectedChartUserComponent extends ForceDirectedChartBaseComponent {

  constructor(public elementRef: ElementRef, private commonService: CommonService) {
    super();
  }

  nodeClick(node) {

    if (node.model === 'UserAll') {
      swal({
        title: '<u>User : ' + node.userId + '</u>',
        backdrop: false,
        type: 'info',
        html:
        '<b style="color: cornflowerblue">' + node.vendor + '</b>' +
        '<br>' +
        '<b>' + node.model + '</b>' +
        '<br>' +
        '<b>' + node.protocol + '</b>' +
        '<br>' +
        '<b>' + node.address + '</b>' +
        '<br>' +
        '<b>' + node.name + '</b>',
        showCloseButton: false,
        showCancelButton: true,
        focusConfirm: true,
        confirmButtonColor: '#9487d6',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'View',
        cancelButtonText: 'Ok',
      }).then((result) => {
        if (result.value) {
          /*this.onOpenUser(node);*/
          this.commonService.clickedUserId = node.userId;
          this.commonService.navigateToUserDetails();
        }
      });
    } else {
      swal({
        title: '<u>Id : ' + node.Id + '</u>',
        backdrop: false,
        type: 'info',
        html:
        '<b style="color: cornflowerblue">' + node.vendor + '</b>' +
        '<br>' +
        '<b>' + node.model + '</b>' +
        '<br>' +
        '<b>' + node.protocol + '</b>' +
        '<br>' +
        '<b>' + node.address + '</b>' +
        '<br>' +
        '<b>' + node.name + '</b>',
        showCloseButton: false,
        showCancelButton: false,
        focusConfirm: true,
        confirmButtonColor: '#a2111e',
        confirmButtonText: 'Ok',
      });
    }
  }
}
