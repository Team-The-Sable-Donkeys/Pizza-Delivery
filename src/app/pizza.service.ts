import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PizzaService {

  constructor(private http: Http) {
  }

  getPizzas() {
    return this.http.get('http://localhost:3000/api/pizzas')
      .map((response) => response.json());
  }

  getPizzaById(id) {
    return this.http.get('http://localhost:3000/api/pizzas/' + id)
      .map((response) => response.json());
  }

  getUsers() {
    return this.http.get('http://localhost:3000/api/users')
      .map((response) => response.json());
  }

  getFixedUser() {
    return this.http.get('http://localhost:3000/api/users')
      .map((response) => response.json().find((u) => u.authKey === localStorage.getItem('auth-key')));
  }

  addToCart(body) {
    return this.http.put('http://localhost:3000/api/cart', body)
      .map((response) => response.json());
  }

  removeFromCart(body) {
    return this.http.delete('http://localhost:3000/api/cart', new RequestOptions({
      body: body
    }));
  }

  sendOrder(data) {
    return this.http.post('http://localhost:3000/api/orders', data);
  }
}
