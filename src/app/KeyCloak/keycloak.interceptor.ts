import { HttpInterceptorFn } from '@angular/common/http';
import { keycloak } from './keycloak-init';

export const keycloakInterceptor: HttpInterceptorFn = (req, next) => {
    if (keycloak.token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });
    }
    return next(req);
};
