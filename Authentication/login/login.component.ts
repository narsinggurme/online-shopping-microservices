import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  constructor(private auth: AuthService) { }

  login() {
    this.auth.login(); // 🔑 Redirects to Keycloak
  }
}
