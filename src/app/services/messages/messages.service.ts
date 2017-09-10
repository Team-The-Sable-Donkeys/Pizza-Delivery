import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class MessagesService {

  constructor(private http: Http) { }

  insertMessage(msg) {
    return this.http.post('https://sablepizzahubdata.herokuapp.com/contact', msg)
      .map((res) => res.json());
  }
}
