import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, CommonModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    if (this.auth.login(this.username, this.password)) {

      const sessionValue = localStorage.getItem('isLoggedIn');
      console.log("Session stored:", sessionValue);

      if (sessionValue === 'true') {
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = 'Session error — login failed!';
      }

    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }

}
