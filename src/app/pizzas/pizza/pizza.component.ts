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
    // this.route.params.subscribe((params) => {
    //   if (params.id) {
    //     this.id = +params.id;
    //   }
    // });
    // // if (typeof this.id !== 'number' || this.id < 1) {
    // //   throw new Error('Invalid id: ' + this.id);
    // // } else {
    // //   this.PizzaService.getPizzaById(this.id)
    // //     .subscribe((value) => {
    // //       console.log('value: ' + value);
    // //       this.pizza = value;
    // //     });
    // // }
    // if (this.id && typeof this.id === 'number') {
    //   this.PizzaService.getPizzaById(this.id)
    //     .subscribe((value) => {
    //       this.pizza = value;
    //     });
    // }
  }

}
