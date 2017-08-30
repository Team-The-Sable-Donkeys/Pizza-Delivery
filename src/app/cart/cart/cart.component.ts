import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[app-cart]',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() pizza;

  constructor() {

   }

  ngOnInit() {
  }

}
