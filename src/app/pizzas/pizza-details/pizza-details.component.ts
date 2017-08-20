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
    // if (typeof this.id !== 'number' || this.id < 1) {
    //   throw new Error('Invalid id: ' + this.id);
    // } else {
    //   this.PizzaService.getPizzaById(this.id)
    //     .subscribe((value) => {
    //       console.log('value: ' + value);
    //       this.pizza = value;
    //     });
    // }
    if (this.id && typeof this.id === 'number') {
      this.PizzaService.getPizzaById(this.id)
        .subscribe((value) => {
          this.pizza = value;
        });
    }
  }
}
