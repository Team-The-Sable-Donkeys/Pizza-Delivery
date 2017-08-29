import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  loginUser(user) {
    console.log(user);
    return this.authService.loginUser(user)
      .subscribe(
      data => localStorage.setItem('auth-key', data),
      error => console.log(error)
      );
  }

}
