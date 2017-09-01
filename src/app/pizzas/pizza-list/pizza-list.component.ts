import { PizzaService } from './../../pizza.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {

  pizzas: Pizza[];

  showLoader = false;

  constructor(private PizzaService: PizzaService) {
  }

  ngOnInit() {
    this.showLoader = true;
    this.PizzaService.getPizzas()
      .subscribe((value) => {
        this.pizzas = value;
        this.showLoader = false;
      });
  }

}

interface Pizza {
  _id: string;
  name: string;
  price: number;
}
