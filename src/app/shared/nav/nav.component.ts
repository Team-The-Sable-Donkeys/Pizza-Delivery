import { PizzaService } from './../../pizza.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public allUsers = [];
  public currentUser;

  constructor(private auth: AuthService, private pizzaService: PizzaService) { console.log('here'); }


  findUser() {
    return this.allUsers.find((u) => u.authKey === localStorage.getItem('auth-key'));
  }

  ngOnInit() {
    console.log('init');
    this.pizzaService.getUsers()
      .subscribe((users) => {
        this.allUsers = users;
        console.log(this.allUsers);
      });
  }

  logout() {
    this.auth.logout();
  }
}
