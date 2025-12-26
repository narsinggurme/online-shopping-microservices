import { ApplicationConfig, provideZoneChangeDetection, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { initializeKeycloak } from './KeyCloak/keycloak-init';
import { keycloakInterceptor } from './KeyCloak/keycloak.interceptor';
import { CorrelationIdInterceptor } from './Core/interceptors/correlation-id.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([keycloakInterceptor])
    ),

    { provide: HTTP_INTERCEPTORS, useClass: CorrelationIdInterceptor, multi: true },

    provideAppInitializer(() => initializeKeycloak()),
  ],
};
