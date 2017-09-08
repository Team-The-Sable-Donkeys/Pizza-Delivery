import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../../pizza.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public currentUser;

  constructor(private pizzaService: PizzaService) { }


  ngOnInit() {
   this.currentUser = this.pizzaService.getFixedUser()
      .subscribe((u) => {
        this.currentUser = u;
      });
  }

}
