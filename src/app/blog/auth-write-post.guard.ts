import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService, PermissionValue } from '../core/auth.service';


@Injectable()
export class AuthWritePostGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const ho = new PermissionValue('blog-post-write', false);
      this.auth.hasPermission(ho);
      if (!ho.permission) {
        this.auth.redirectUrl = state.url;
        this.router.navigate(['/login']);
      }
    return ho.permission;
  }
}
