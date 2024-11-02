import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { RouterModule } from '@angular/router'; 
/* navbar.component.ts */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isAuthenticated$ = this.auth.isAuthenticated$; 
  profile: any;

  constructor(@Inject(AuthService) public auth: AuthService) {}

  ngOnInit(): void {
    // Obtenha o perfil do usuário se autenticado
    this.auth.user$.subscribe((profile) => {
      this.profile = profile;
    });
  }
}
