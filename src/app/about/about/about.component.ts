import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  // Should declare adress class: (pizza location adreess might be needed elsewhere)
  // pizzaAdress.city;
  // pizzaAdress.street; etc
  // also data bind the adress data into the about.component.html

  constructor() { }

  ngOnInit() {
  }

}
