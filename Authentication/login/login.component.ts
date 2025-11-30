import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = '';
  password = '';
  role: string = 'user';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    if (this.role === 'admin') {
      if (this.username === 'admin' && this.password === 'admin123') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('role', 'admin');

        this.router.navigate(['/admin-dashboard']);
        return;
      } else {
        this.errorMessage = 'Invalid Admin Credentials!';
        return;
      }
    }
    const loggedIn = this.auth.login(this.username, this.password);

    if (loggedIn) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', 'user');

      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Invalid Username or Password!';
    }
  }
}
