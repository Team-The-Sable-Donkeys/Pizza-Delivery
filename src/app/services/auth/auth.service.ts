import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  adminAuthKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluI'
   + 'iwicGFzc3dvcmQiOiJhZG1pbiIsImFkZHJlc3MiOnt9LCJjYXJ0IjpbXSwiaWF0IjoxNTA0MjY1ODQzfQ'
   + '.KJNAAz95_2BC5IVN03u5jCSebEoWxXkhamjG7vJp1e0';

  constructor(private http: Http, private router: Router) { }

  loginUser(user) {
    return this.http.post('http://localhost:3000/login', user)
      .map(res => res.json());
  }

  isLoggedIn() {
    return tokenNotExpired('auth-key');
  }

  logout() {
    localStorage.removeItem('auth-key');
    this.router.navigate(['/home']);
  }

  isAdmin() {
    const gotAdminKey = (localStorage.getItem('auth-key') === this.adminAuthKey) ? true : false;
    return this.isLoggedIn() && gotAdminKey;
  }

}
