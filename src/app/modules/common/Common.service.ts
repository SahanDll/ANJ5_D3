import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Login} from '../login/Login';
import {JSEncrypt} from 'jsencrypt';
import {Router} from '@angular/router';
import { environment } from '../../../environments/environment';
import Base64 = require('crypto-js/enc-base64');

interface PublicKeyResponse {
  key: string;
}

interface OauthResponse {
  access_token: string;
}

interface LoginResponse {
  role: string;
  auth: string;
  pass: string;
}

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};

const user = {
  userName: '',
  encPassword: ''
};

const mainUrl = environment.apiEndpoint;
const apiUrl = mainUrl + '/api';
const loginUrl = apiUrl + '/user-login/';
const authUrl = mainUrl + '/oauth/token';

@Injectable()
export class CommonService {
  private user;
  private _authToken: string;
  private _authRole: string;
  private _authUser: string;
  private _clickedUserId: string;

  constructor(private http: HttpClient, private router: Router) {
    this.user = user;
  }

  login(login): Promise<Login> {
    login.auth = false;
    login.role = 0;
    return this.http
      .get<PublicKeyResponse>(loginUrl + 'getPublicKey')
      .toPromise()
      .then(pkResult => {
          this.user.userName = login.userName;
          const crypto = new JSEncrypt();
          crypto.setPublicKey(pkResult.key);
          this.user.encPassword = crypto.encrypt(login.password);
          return this.http
            .post<LoginResponse>(loginUrl + 'authenticateUser', JSON.stringify(this.user), httpOptions)
            .toPromise()
            .then(loginResult => {
              if (loginResult.auth) {
                const data =  'grant_type=password&username=' + login.userName + '&password=' + loginResult.pass;
                return this.http
                  .post<OauthResponse>(authUrl, data, {
                    headers: new HttpHeaders().set('Authorization', this.getBasicAuth())
                      .set('Content-Type', 'application/x-www-form-urlencoded')
                  })
                  .toPromise()
                  .then(oAuthResult => {
                      login.auth = loginResult.auth;
                      login.role = loginResult.role;
                      login.token = oAuthResult.access_token;
                      return login;
                    }
                  )
                  .catch(error =>
                    console.log(error)
                  );
              } else {
                login.auth = false;
                login.role = 0;
                return login;
              }
              }
            )
            .catch(error =>
              console.log(error)
            );
        }
      )
      .catch(error =>
        console.log(error)
      );
  }

  screen(): Promise<any[]> {
    return this.http
      .get<any>(apiUrl + '/view/read-all', {
        headers: new HttpHeaders().set('Authorization', this.getBearerAuth())
          .set('Content-Type', 'application/json')
      })
      .toPromise()
      .then(screenResult => {

          return screenResult;
        }
      )
      .catch(error =>
        console.log(error)
      );
  }

  version(): Promise<any> {
    return this.http
      .get<any>(apiUrl + '/downloaded/read-all', {
        headers: new HttpHeaders().set('Authorization', this.getBearerAuth())
          .set('Content-Type', 'application/json')
      })
      .toPromise()
      .then(versionResult => {
          return versionResult;
        }
      )
      .catch(error =>
        console.log(error)
      );
  }

  device(): Promise<any> {
    return this.http
      .get<any>(apiUrl + '/using/read-all', {
        headers: new HttpHeaders().set('Authorization', this.getBearerAuth())
          .set('Content-Type', 'application/json')
      })
      .toPromise()
      .then(deviceResult => {
          return deviceResult;
        }
      )
      .catch(error =>
        console.log(error)
      );
  }

  users(): Promise<any> {
    return this.http
      .get<any>(apiUrl + '/user/read-all', {
        headers: new HttpHeaders().set('Authorization', this.getBearerAuth())
          .set('Content-Type', 'application/json')
      })
      .toPromise()
      .then(usersResult => {
          return usersResult;
        }
      )
      .catch(error =>
        console.log(error)
      );
  }

  userDetails(userId): Promise<any> {
    return this.http
      .get<any>(apiUrl + '/user/read-by-user?userId=' + userId, {
        headers: new HttpHeaders().set('Authorization', this.getBearerAuth())
          .set('Content-Type', 'application/json')
      })
      .toPromise()
      .then(usersResult => {
          return usersResult;
        }
      )
      .catch(error =>
        console.log(error)
      );
  }

  location(): Promise<any> {
    return this.http
      .get<any>(apiUrl + '/login/read-all', {
        headers: new HttpHeaders().set('Authorization', this.getBearerAuth())
          .set('Content-Type', 'application/json')
      })
      .toPromise()
      .then(locationResult => {
          return locationResult;
        }
      )
      .catch(error =>
        console.log(error)
      );
  }

  screenEngage(): Promise<any> {
    return this.http
      .get<any>(apiUrl + '/engage/read-all', {
        headers: new HttpHeaders().set('Authorization', this.getBearerAuth())
          .set('Content-Type', 'application/json')
      })
      .toPromise()
      .then(engageResult => {
          return engageResult;
        }
      )
      .catch(error =>
        console.log(error)
      );
  }

  get authToken(): string {
    return this._authToken;
  }

  set authToken(value: string) {
    this._authToken = value;
  }

  get authRole(): string {
    return this._authRole;
  }

  set authRole(value: string) {
    this._authRole = value;
  }

  get authUser(): string {
    return this._authUser;
  }

  set authUser(value: string) {
    this._authUser = value;
  }

  get clickedUserId(): string {
    return this._clickedUserId;
  }

  set clickedUserId(value: string) {
    this._clickedUserId = value;
  }

  private getBasicAuth() {
    const clientId = 'sentinelJwtClientId';
    const clientSecret = 'mySecret';
    return 'Basic ' + btoa(clientId + ':' + clientSecret);
  }

  private getBearerAuth() {
    return 'Bearer ' + this._authToken;
  }

  navigateToHome() {
    this.router.navigate(['/', 'home'], {skipLocationChange: true});
  }
  navigateToViewAll() {
    this.router.navigate(['/', 'bigquery-view'], {skipLocationChange: true});
  }
  navigateToUserDetails() {
    this.router.navigate(['/', 'userDetails'], {skipLocationChange: true});
  }
}
