import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PizzaService {

  constructor(private http: Http) {
  }

  url = 'https://sablepizzahubdata.herokuapp.com/';

  getPizzas() {
    return this.http.get(this.url + 'api/pizzas')
      .map((response) => response.json());
  }

  getPizzaById(id) {
    return this.http.get(this.url + 'api/pizzas/' + id)
      .map((response) => response.json());
  }

  getUsers() {
    return this.http.get(this.url + 'api/users')
      .map((response) => response.json());
  }

  getFixedUser() {
    return this.http.get(this.url + 'api/users')
      .map((response) => response.json().find((u) => u.authKey === localStorage.getItem('auth-key')));
  }

  getFixedUserAddress() {
    return this.http.get(this.url + 'api/users')
      .map((response) => response.json().find((u) => u.authKey === localStorage.getItem('auth-key')))
      .map((usr) => usr.address);
  }

  getFixedOrder(username) {
    return this.http.get(this.url + 'api/user-orders')
    .map((response) => response.json().filter((o) => o.username === username));
  }

  addToCart(body) {
    return this.http.put(this.url + 'api/cart', body)
      .map((response) => response.json());
  }

  removeFromCart(body) {
    return this.http.delete(this.url + 'api/cart', new RequestOptions({
      body: body
    }));
  }

  sendOrder(data) {
    return this.http.post(this.url + 'api/orders', data);
  }
}
