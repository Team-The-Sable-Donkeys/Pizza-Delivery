import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor(private http: Http) {
  }

  registerUser(user) {
    return this.http.post('http://localhost:3000/register', user);
  }

  clearUserCart(user) {
    return this.http.delete('http://localhost:3000/api/empty', new RequestOptions({
      body: user
    }));
  }

  updateUserProfile(data) {
    return this.http.post('http://localhost:3000/api/users', data);
  }

}
