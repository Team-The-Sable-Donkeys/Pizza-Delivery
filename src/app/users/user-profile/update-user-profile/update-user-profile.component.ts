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
  errorMessage;
  message;

  username;
  password;
  confirmPassword;
  firstName;
  lastName;
  city;
  country;
  street;
  additionalInfo;
  phoneNumber;

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

    const inputPhoneNumber = +user.phoneNumber;
    const numbReg = /^\d+$/;
    const lettersReg = /^[a-zA-Z]*$/;

    if (user.phoneNumber && !numbReg.test(user.phoneNumber)) {
      this.errorMessage = 'Phone number must consist of numbers only!';
      return;
    }
    if (user.phoneNumber && user.phoneNumber.length < 8) {
      this.errorMessage = 'Phone number must be at least 8 digits';
      return;
    }

    if (user.address.country && !lettersReg.test(user.address.country)) {
      this.errorMessage = 'Country name must consist of latin letters only!';
      return;
    }

    if (user.address.city && !lettersReg.test(user.address.city)) {
      this.errorMessage = 'City name must consist of latin letters only!';
      return;
    }

    return this.usersService.updateUserProfile(data)
      .subscribe((users) => {
        this.message = 'success';
        this.router.navigate(['/profile/view']);
      },
      (error) => {
        console.log('Ooooops, korec');
      });
  }
}
