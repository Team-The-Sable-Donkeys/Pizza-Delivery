import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor(private http: Http) {
  }

  // generateAuthKey() {
  //   const map = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789!@#$%^&*';
  //   const length = 20;
  //   let authKey = '';
  //   let index;
  //   for (let i = 0; i < length; i++) {
  //     index = Math.floor((Math.random() * map.length) + 0);
  //     authKey += map[index];
  //   }
  //   return authKey;
  // }

  registerUser(user) {
    // user.authKey = this.generateAuthKey();
    return this.http.post('http://localhost:3000/register', user);
  }

}
