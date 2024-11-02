import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular'; 
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export const authGuardGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const auth = inject(AuthService); 
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    map(isAuthenticated => {
      if (!isAuthenticated) {
        auth.loginWithRedirect({ appState: { target: state.url } }); // redireciona para login
      }
      return isAuthenticated;
    })
  );
};
