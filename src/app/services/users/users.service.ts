import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor(private http: Http) {
  }

  url = 'https://sablepizzahubdata.herokuapp.com/';

  registerUser(user) {
    return this.http.post(this.url + 'register', user);
  }

  clearUserCart(user) {
    return this.http.delete(this.url + 'api/empty', new RequestOptions({
      body: user
    }));
  }

  updateUserProfile(data) {
    return this.http.post(this.url + 'api/users', data).subscribe();
  }

}
