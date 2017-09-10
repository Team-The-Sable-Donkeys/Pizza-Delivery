import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage;
  username;
  password;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginUser(user) {
    return this.authService.loginUser(user)
      .subscribe(
      (data) => {
        localStorage.setItem('auth-key', data);
        this.router.navigate(['/home']);
      },
      error => this.errorMessage = 'Username / password incorrect'
      );
  }

}
