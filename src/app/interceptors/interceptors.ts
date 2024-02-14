import { Injectable } from '@angular/core';
import {HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Récupérer l'utilisateur en ligne du local storage
    const userOnlineString = localStorage.getItem('userOnline');
    const userOnline = userOnlineString ? JSON.parse(userOnlineString) : null;
    // Assurez-vous que userOnline et userOnline.token sont définis et non vides
    if (userOnline && userOnline.token && typeof userOnline.token === 'string' && userOnline.token.trim() !== '') {
      // Ajouter le token à l'en-tête de la requête
      const token = userOnline.token;
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}
