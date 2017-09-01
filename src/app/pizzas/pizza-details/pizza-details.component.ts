import { PizzaService } from './../../pizza.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizza-details',
  templateUrl: './pizza-details.component.html',
  styleUrls: ['./pizza-details.component.css']
})
export class PizzaDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private PizzaService: PizzaService) {
  }

  pizza;
  id: number;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.id = +params.id;
      }
    });
    if (this.id && typeof this.id === 'number') {
      this.PizzaService.getPizzaById(this.id)
        .subscribe((value) => {
          this.pizza = value;
        });
    }
  }
}
