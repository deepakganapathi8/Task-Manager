import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // If user is already authenticated, redirect to tasks page
    if (authService.isAuthenticated()) {
        return router.createUrlTree(['/tasks']);
    }

    // Allow access to login page if not authenticated
    return true;
};
