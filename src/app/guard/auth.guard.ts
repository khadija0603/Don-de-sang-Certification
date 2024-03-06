// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthServiceService } from 'src/service/auth-service.service';

// @Injectable({
//   providedIn: 'root',
// })
export class AuthGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error("Method not implemented.");
  }
//   constructor(private authService: AuthServiceService, private router: Router) {}

// canActivate(): boolean {
//     if (this.authService.isAuthenticatedSubject.value) {
//       // L'utilisateur est connecté, autorise l'accès à la route
//       return true;
//     } else {
//       // L'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
//       this.router.navigate(['/auth']);
//       return false;
//     }
//   }
}


import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export const AdminGuard = () => {
    const router = inject(Router);
    const auth = JSON.parse(localStorage.getItem("isAdmin") || "");

    if (!auth) {
        router.navigateByUrl('/auth')
        return false;
    }

    return true;
}

export const StructureGuard = () => {
    const router = inject(Router);
    const auth = JSON.parse(localStorage.getItem("isStructure") || "");
    if (!auth) {
        router.navigateByUrl('/auth')
        return false;
    }

    return true;
}

export const DonateurGuard = () => {
    const router = inject(Router);
    const auth = JSON.parse(localStorage.getItem("isDonateur") || "");
    if (!auth) {
        router.navigateByUrl('/auth')
        return false;
    }

    return true;
}
