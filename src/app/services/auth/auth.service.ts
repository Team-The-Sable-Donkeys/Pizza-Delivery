import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

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

}
