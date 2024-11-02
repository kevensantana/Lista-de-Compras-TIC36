import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ProductsService } from './products.service';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private userProfile: any;

  constructor(private auth: AuthService, private productsService: ProductsService) {}

  initializeUserProfile(): Observable<any> {
    return this.auth.user$.pipe(
      switchMap(profile => {
        if (profile) {
          
          const userProfile = {
            id: profile.sub,
            name: profile.name,
            firstName: profile.given_name,
            lastName: profile.family_name,
            email: profile.email,
            picture: profile.picture
          };

          // Verifica se o usuário já existe no JSON server
          return this.productsService.checkUserExists(userProfile.id).pipe(
            switchMap(exists => {
              if (!exists) {
                // Se não existir, salva no JSON server
                return this.productsService.postUser(userProfile);
              }
              return of(userProfile); 
            }),
            tap(data => this.userProfile = data), 
            catchError(error => {
              console.error('Erro ao inicializar o perfil do usuário:', error);
              return of(null);
            })
          );
        }
        return of(null);
      })
    );
  }

  getUserProfile(): any {
    return this.userProfile;
  }
}
