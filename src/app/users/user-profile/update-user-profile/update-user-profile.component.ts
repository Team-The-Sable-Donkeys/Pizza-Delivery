import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
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
    private pizzaService: PizzaService,
   public toastr: ToastsManager,
    vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
    }

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
      this.toastr.error('Phone number must consist of numbers only', null, {
          animate: 'flyRight',
          positionClass: 'toast-top-full-width',
          showCloseButton: 'true',
          toastLife: 3000
        });
      return;
    }
    if (user.phoneNumber && user.phoneNumber.length < 8) {
      this.toastr.error('Phone number must be at least 8 digits', null, {
          animate: 'flyRight',
          positionClass: 'toast-top-full-width',
          showCloseButton: 'true',
          toastLife: 3000
        });
      return;
    }

    if (user.address.country && !lettersReg.test(user.address.country)) {
      this.toastr.error('Country name must consist of latin letters only!', null, {
          animate: 'flyRight',
          positionClass: 'toast-top-full-width',
          showCloseButton: 'true',
          toastLife: 3000
        });
      return;
    }

    if (user.address.city && !lettersReg.test(user.address.city)) {
      this.toastr.error('City name must consist of latin letters only!', null, {
          animate: 'flyRight',
          positionClass: 'toast-top-full-width',
          showCloseButton: 'true',
          toastLife: 3000
        });
      return;
    }

     this.usersService.updateUserProfile(data);
        this.toastr.success('You have successfuly updated you data!', null, {
          animate: 'flyRight',
          positionClass: 'toast-top-full-width',
          showCloseButton: 'true',
          toastLife: 2000
        });
        setTimeout(() => {
          this.router.navigate(['/profile/view']);
        }, 2500);
  }
}
