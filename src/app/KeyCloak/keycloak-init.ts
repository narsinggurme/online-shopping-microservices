import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
    url: 'http://localhost:8181',
    realm: 'spring-microservice-security-realm',
    clientId: 'angular-client-test',
});

export function initializeKeycloak() {
    return keycloak.init({
        onLoad: 'check-sso',
        pkceMethod: 'S256',
        checkLoginIframe: false
    });
}
