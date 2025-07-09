import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log('AuthGuard: Checking authentication and authorization');
    if (!this.authService.isAuthenticated()) {
      console.log('AuthGuard: User is not authenticated, redirecting to login');
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRoles = route.data['roles'] as UserRole[];
    if (requiredRoles) {
      console.log('AuthGuard: Checking user role against required roles', requiredRoles);
       // Get the user's role from the auth service
      const userRole = this.authService.getUserRole();
      if (!userRole || !requiredRoles.includes(userRole)) {
        this.router.navigate(['/unauthorized']);
        return false;
      }
    }

    return true;
  }
}