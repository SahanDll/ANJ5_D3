import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../common/Common.service';

@Injectable()
export class NotificationService {

  constructor(private commonService: CommonService) {
  }

}
