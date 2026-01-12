import { Injectable } from '@angular/core';
import { keycloak } from '../src/app/KeyCloak/keycloak-init';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  login(redirectUri?: string): Promise<void> {
    return keycloak.login({
      redirectUri: redirectUri || window.location.origin + '/home',
    });
  }

  logout(): void {
    keycloak.logout({
      redirectUri: window.location.origin,
    });
  }

  // isLoggedIn(): boolean {
  //   return !!keycloak.token;
  // }
  isLoggedIn(): boolean {
    return keycloak.authenticated === true;
  }

  getUsername(): string | undefined {
    return keycloak.tokenParsed?.['preferred_username'];
  }
}
