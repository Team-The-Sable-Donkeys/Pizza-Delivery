import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OrdersService {

  constructor(private http: Http) { }

  getOrders(page) {
    const params = new URLSearchParams();
    params.set('page', page);
    return this.http.get('http://localhost:3000/api/orders?page=' + page)
      .map((response) => response.json());
  }

}
