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

  showLoader = false;
  btnDisabled = false;

  constructor(private route: ActivatedRoute,
    private PizzaService: PizzaService,
    public auth: AuthService) {
  }

  ngOnInit() {
  }

  pizzaIsLoaded() {
    if (this.pizza.imageUrl) {
      return this.pizza.imageUrl;
    } else {
      return '../../../assets/Spinner.gif';
    }
  }

  addToCart() {
    this.showLoader = true;
    this.btnDisabled = true;

    this.PizzaService.getUsers()
      .map((users) => {
        const loggedUser = users.find((u) => u.authKey === localStorage.getItem('auth-key'));
        const body = {
          pizza: this.pizza,
          userId: loggedUser.id
        };
        this.PizzaService.addToCart(body)
          .subscribe();
      })
      .subscribe(() => {
        this.showLoader = false;
        this.btnDisabled = false;
      });

    // 100% working below
    // this.PizzaService.getUsers()
    //   .subscribe((users) => {
    //     const loggedUser = users.find((u) => u.authKey === localStorage.getItem('auth-key'));
    //     const body = {
    //       pizza: this.pizza,
    //       userId: loggedUser.id
    //     };
    //     this.PizzaService.addToCart(body)
    //       .subscribe(() => {
    //       });
    //   });
  }
}
