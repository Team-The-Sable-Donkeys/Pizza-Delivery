import { PizzaService } from './../../pizza.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public currentUser;



  constructor(public auth: AuthService, private pizzaService: PizzaService) { }


  ngOnInit() {
   this.currentUser = this.pizzaService.getFixedUser()
      .subscribe((u) => {
        this.currentUser = u;
      });
  }

  logout() {
    this.auth.logout();
  }
}
