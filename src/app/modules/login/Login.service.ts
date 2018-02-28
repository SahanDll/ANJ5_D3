import {Injectable} from '@angular/core';

@Injectable()
export class LoginService {
  private _token: string;
  constructor() {
  }
  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }
}
