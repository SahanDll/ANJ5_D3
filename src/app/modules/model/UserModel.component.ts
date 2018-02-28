import {Component, Inject, OnInit} from '@angular/core';
import {CommonService} from '../common/Common.service';

@Component({
  selector: 'app-user-model',
  templateUrl: 'UserModel.component.html'
})

export class UserModelComponent implements OnInit {
  private _chartData: Array<any> = [];
  private _viewMode: String = '1';

  constructor(private commonService: CommonService) {
    this.commonService.userDetails(this.commonService.clickedUserId).then((res) => {
      this._chartData = res.Result;
    }  );
    console.log(this._chartData);
  }

  onBackClick(): void {
    this.commonService.navigateToViewAll();
  }

  ngOnInit() {
  }

  graphClick() {
    this._viewMode = '1';
  }

  tableClick() {
    this._viewMode = '2';
  }

  jsonClick() {
    this._viewMode = '3';
  }

  get chartData(): Array<any> {
    return this._chartData;
  }

  set chartData(value: Array<any>) {
    this._chartData = value;
  }


  get viewMode(): String {
    return this._viewMode;
  }

  set viewMode(value: String) {
    this._viewMode = value;
  }
}
