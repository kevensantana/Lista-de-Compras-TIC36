import { Component } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar"
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, NavbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent { }
