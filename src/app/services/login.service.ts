import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpContext } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public identity;
  public token;
  constructor(private http: HttpClient) {}
  getIdentity() {
    // eslint-disable-next-line prefer-const
    let identity = JSON.parse(localStorage.getItem('identity'));
    // eslint-disable-next-line eqeqeq
    if (identity != 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    // eslint-disable-next-line prefer-const
    let token = localStorage.getItem('token');
    // eslint-disable-next-line eqeqeq
    if (token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }
}
