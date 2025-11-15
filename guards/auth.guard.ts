import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    console.log("User not logged in → redirecting to login");
    return router.parseUrl('/login');
  }

  console.log("User logged in → allow access");
  return true;
};
