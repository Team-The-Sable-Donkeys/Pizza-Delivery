import { PizzaService } from './../../pizza.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {
  id: number;
  @Input() pizza;

  constructor(private route: ActivatedRoute, private PizzaService: PizzaService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
    if (this.id) {
      this.PizzaService.getPizzaById(this.id)
        .subscribe((value) => {
          this.pizza = value;
        });
    }
  }

}
