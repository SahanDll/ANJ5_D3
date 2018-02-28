import {Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import {CommonService} from '../common/Common.service';
import {Router} from '@angular/router';
import {LoginService} from './Login.service';

const login = {
  userName: '',
  password: '',
  role: '',
  auth: '',
  token: ''
};

@Component({
  selector: 'app-login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})


export class LoginComponent implements OnInit {
  public userName: string;
  public password: any;
  private login;
  constructor(private router: Router, private commonService: CommonService, private loginService: LoginService) {
    this.login = login;
  }

  ngOnInit() {
  }

  submitLogin() {
    this.login.userName = this.userName;
    this.login.password = this.password;
    this.commonService.login(this.login).then(result => {
      if (result.auth) {
        this.login.token = result.token;
        this.loginService.token = this.login.token;
        this.commonService.authToken = this.login.token;
        this.commonService.authRole = this.login.role;
        this.commonService.authUser = this.login.userName;
        this.router.navigate(['/', 'home'], {skipLocationChange: true});
        /*      this.router.navigate(['/', 'home'], {skipLocationChange: true}).then(nav => {
                console.log(nav); // true if navigation is successful
              }, err => {
                console.log(err); // when there's an error
              });*/
      } else {
        this.userName = '';
        this.password = '';
        swal({
          backdrop: false,
          type: 'error',
          title: 'Incorrect Credentials',
          text: 'Enter Correct Username and Password'
        });
      }
    });
  }

  fakeLogin() {
    this.router.navigate(['/', 'home'], {skipLocationChange: true});
  }
}
