import { tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  loginUser(user) {
    return this.http.post('http://localhost:3000/login', user)
      .map(res => res.json());
    // .subscribe(
    //   data => localStorage.setItem('auth-key', data.authKey),
    //   error => console.log(error)
    // );
  }

  isloggedIn() {
    return tokenNotExpired('auth-key');
  }

  logout() {
    localStorage.removeItem('auth-key');
  }

}
