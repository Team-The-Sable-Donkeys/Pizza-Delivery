import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MakeCustomPizzaService {

constructor(private http: Http) { }

getSizes() {
    return this.http.get('http://localhost:3000/api/custom-pizza-sizes')
        .map((res) => res.json());
}


getFlours() {
    return this.http.get('http://localhost:3000/api/custom-pizza-flours')
        .map((res) => res.json());
}

getMeats() {
    return this.http.get('http://localhost:3000/api/custom-pizza-meats')
        .map((res) => res.json());
}

getDairies() {
    return this.http.get('http://localhost:3000/api/custom-pizza-dairies')
        .map((res) => res.json());
}

getSauces() {
    return this.http.get('http://localhost:3000/api/custom-pizza-sauces')
        .map((res) => res.json());
}

}

