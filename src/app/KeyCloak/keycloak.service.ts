// keycloak.service.ts
import { Injectable } from '@angular/core';
import { keycloak } from './keycloak-init';

@Injectable({ providedIn: 'root' })
export class KeycloakService {

    getProfile() {
        return keycloak.loadUserProfile();
    }

    getToken() {
        return keycloak.token;
    }

    isLoggedIn(): boolean {
        return !!keycloak.token;
    }
}
