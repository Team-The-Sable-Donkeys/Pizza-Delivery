import { AuthService } from './../../services/auth/auth.service';
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

  isLoading: boolean;


  constructor(private route: ActivatedRoute,
    private PizzaService: PizzaService,
    private auth: AuthService) {
  }

  ngOnInit() {
    if (this.pizza) {
      this.isLoading = false;
    } else {
      this.isLoading = true;
    }
  }

  addToCart(id) {
    this.PizzaService.getUsers()
      .subscribe((users) => {
        const loggedUser = users.find((u) => u.authKey === localStorage.getItem('auth-key'));
        this.PizzaService.getPizzaById(id)
          .subscribe((pizza) => {
            const body = {
              pizza: pizza,
              userId: loggedUser.id
            };
            this.PizzaService.addToCart(body)
              .subscribe();
          });
      });
  }

}
