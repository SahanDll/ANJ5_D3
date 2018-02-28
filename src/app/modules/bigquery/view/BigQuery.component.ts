import {Component, Input, OnInit, Pipe, PipeTransform, SimpleChanges} from '@angular/core';
import swal from 'sweetalert2';
import {CommonService} from '../../common/Common.service';
import {LoginService} from '../../login/Login.service';
import { ForceDirectedDataService } from '../../chart/ForceDirectChart.service';

@Pipe({
  name: 'prettyprint'
})
export class PrettyPrintPipe  implements PipeTransform {
  transform(val) {
    return JSON.stringify(val, null, 2)
      .replace(/ /g, '&nbsp;')
      .replace(/\n/g, '<br/>');
  }
}

@Component({
  selector: 'app-bigquery',
  templateUrl: './BigQuery.component.html',
  styleUrls: ['./BigQuery.component.css', '../../home/Home.component.css']
})

export class BigQueryComponent implements OnInit {
  private _userId: string;
  private _screenData: any[] = [];
  private _chartData: Array<any> = [];
  constructor(private loginService: LoginService, private commonService: CommonService,
              private forceDirectedDataService: ForceDirectedDataService) {
  }
  ngOnInit(): void {
  }
  get userId(): string {
    return this._userId;
  }

  @Input() set userId(value: string) {
    this._userId = value;
    if (this._userId.length >= 3) {
      swal({
        backdrop: false,
        type: 'warning',
        title: this._userId,
        text: '. . . . . . . . . . . .'
      });
    }
  }

  private keyDownFunction(event) {
    if (event.keyCode === 13) {
      if (this._userId.length >= 3) {
        swal({
          backdrop: false,
          type: 'warning',
          title: this._userId,
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

  private screen() {
    this.commonService.screen().then((res) => {
      this._screenData = res;
    }  );
  }

  private location() {
    this.commonService.location().then((res) => {
      this._screenData = res;
    }  );
  }

  private device() {
    this.commonService.device().then((res) => {
      this._screenData = res;
    }  );
  }

  private version() {
    this.commonService.version().then((res) => {
      this._screenData = res;
    }  );
  }

  private users() {
/*    this._chartData = this.forceDirectedDataService.createSensors(30);
    console.log(this._chartData)*/
/*    setInterval(() => {
      this._chartData = this.forceDirectedDataService.createSensors(30);
    }, 5000);*/
    this.commonService.users().then((res) => {
      this._screenData = res;
      this._chartData = res.Result;
    }  );
  }

  private viewAllClick() {
    swal({
      backdrop: false,
      type: 'warning',
      title: 'This is View All',
      text: '. . . . . . . . . . . .'
    });
  }


  get chartData(): Array<any> {
    return this._chartData;
  }

  set chartData(value: Array<any>) {
    this._chartData = value;
  }

  get screenData(): any[] {
    return this._screenData;
  }

  set screenData(value: any[]) {
    this._screenData = value;
  }

  private getData(): String {
    return JSON.stringify(this._screenData, null, 2)
      .replace(/ /g, '&nbsp;')
      .replace(/\n/g, '<br/>')
      .replace('\\', '');
  }
}
