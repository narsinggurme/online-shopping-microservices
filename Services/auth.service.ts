import { Injectable } from '@angular/core';
import { keycloak } from '../src/app/KeyCloak/keycloak-init';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  login(): void {
    keycloak.login({
      redirectUri: window.location.origin + '/home', // redirect after login
    });
  }

  logout(): void {
    keycloak.logout({
      redirectUri: window.location.origin, // back to home
    });
  }

  isLoggedIn(): boolean {
    return !!keycloak.token;
  }

  getUsername(): string | undefined {
    return keycloak.tokenParsed?.['preferred_username'];
  }
}
