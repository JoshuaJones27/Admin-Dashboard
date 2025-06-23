import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  // Inject Router and AuthService into the guard
  constructor(private router: Router, private authService: AuthService) {}

  /**
   * Determines if a route can be activated based on authentication status.
   * @param next The next route snapshot.
   * @param state The current router state snapshot.
   * @returns Observable or boolean indicating if navigation is allowed.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Check if the user is authenticated
    return this.authService.isAuthenticated().pipe(
      map((loggedIn) => {
        if (loggedIn) {
          // Allow navigation if authenticated
          return true;
        } else {
          // Redirect to login if not authenticated
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
