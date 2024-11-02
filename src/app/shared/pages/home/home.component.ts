import { Component, Inject } from '@angular/core';
import { FormComponent } from "../../components/form/form.component";
import { ListComponent } from "../../../features/list/list.component";
import { AuthService, User } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}