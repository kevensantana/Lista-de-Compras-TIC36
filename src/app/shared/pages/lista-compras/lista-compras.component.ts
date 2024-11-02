import { Component, Inject, OnInit } from '@angular/core';
import { ListComponent } from "../../../features/list/list.component";
import { User, AuthService } from '@auth0/auth0-angular';
import { FormComponent } from '../../components/form/form.component';
import { CommonModule } from '@angular/common';
import { UserProfileService } from '../../services/userProfile.service';

@Component({
  selector: 'app-lista-compras',
  standalone: true,
  imports: [FormComponent, ListComponent, CommonModule],
  templateUrl: './lista-compras.component.html',
  styleUrl: './lista-compras.component.scss'
})
export class ListaComprasComponent implements OnInit {
  profile: any;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {

    this.userProfileService.initializeUserProfile().subscribe(profile => {
      this.profile = profile;
    });
  }
}

