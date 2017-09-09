import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class MessagesService {

  constructor(private http: Http) { }

  insertMessage(msg){
    return this.http.post('http://localhost:3000/contact', msg);
  }
}
