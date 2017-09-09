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

  canRegister = true;
  errorMessage;
  currentUser;

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
    // if (user.password !== user.confirmPassword) {
    //   this.canRegister = false;
    //   this.errorMessage = 'Passwords must match!';
    // } else if (user.password !== undefined || user.confirmPassword !== undefined) {
    //   if (user.password.length < 5 || user.confirmPassword.length < 5) {
    //     this.canRegister = false;
    //     this.errorMessage = 'Your password must be atleast 5 symbols long!';
    //   }
    // }
    // if (user.password === '' || user.confirmPassword === '') {
    //   this.canRegister = false;
    //   this.errorMessage = 'Please enter a password!';
    // }

    // Registration
    const data = {
      oldData: this.currentUser,
      newData: user
    };
    return this.usersService.updateUserProfile(data)
      .subscribe((users) => {
        console.log(users);
        this.router.navigate(['/profile/view']);
      },
      (error) => {
        console.log('Ooooops, korec');
      });
  }
}
