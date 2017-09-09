import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import { Router } from '@angular/router';
import { PizzaService } from '../../../pizza.service';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.css']
})
export class UpdateUserProfileComponent implements OnInit {

  currentUser;
message;

  constructor(private usersService: UsersService,
    private router: Router,
  private pizzaService: PizzaService) { }

  ngOnInit() {
    this.currentUser = this.pizzaService.getFixedUser()
      .subscribe((u) => {
        this.currentUser = u;
      });
  }

  updateProfile(user) {

    const data = {
      oldData: this.currentUser,
      newData: user
    };
    return this.usersService.updateUserProfile(data)
      .subscribe((users) => {
        this.message = 'success';
        this.router.navigate(['/profile/view']);
        console.log(users);
      },
      (error) => {
        console.log('Ooooops, korec');
      });
  }
}
