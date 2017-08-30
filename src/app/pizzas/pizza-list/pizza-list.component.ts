import { PizzaService } from './../../pizza.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {

  pizzas: Pizza[];


  constructor(private PizzaService: PizzaService) {
  }

  ngOnInit() {
    this.PizzaService.getPizzas()
      .subscribe((value) => {
        this.pizzas = value;
      });
  }

}

interface Pizza {
  _id: string;
  name: string;
  price: number;
}
