import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

// CanActivate is deprecated in Angular 16 in favor of CanActivateFn, which is a simpler function-based approach to route guards. 
// The authGuard function checks if the user is authenticated before allowing access to certain routes. 

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
      return true;
    }

    router.navigate(['/login']);
    return false;
};
