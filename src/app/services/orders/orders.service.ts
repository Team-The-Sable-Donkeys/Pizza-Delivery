import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OrdersService {

  constructor(private http: Http) { }

  getOrders() {
    return this.http.get('http://localhost:3000/api/orders')
      .map((response) => response.json());
  }

}
