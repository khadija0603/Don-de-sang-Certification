import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from 'src/service/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

canActivate(): boolean {
    if (this.authService.isAuthenticatedSubject.value) {
      // L'utilisateur est connecté, autorise l'accès à la route
      return true;
    } else {
      // L'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
