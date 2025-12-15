import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
    url: 'http://localhost:8181',
    realm: 'angular-testing',
    clientId: 'angular-client-2',
});

export function initializeKeycloak() {
    return keycloak.init({
        onLoad: 'check-sso',
        pkceMethod: 'S256',
        checkLoginIframe: false
    });
}

