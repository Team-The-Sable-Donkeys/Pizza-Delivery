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

  findUser() {
    this.pizzaService.getUsers()
      .subscribe((users) => {
          this.currentUser = users.find((u) => u.authKey === localStorage.getItem('auth-key'));
      });
  }

  ngOnInit() {
   // this.findUser();
  }

}
