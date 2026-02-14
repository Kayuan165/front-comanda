import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-top-navbar',
  imports: [MatButtonModule, MatIconModule],
  standalone: true,
  templateUrl: './top-navbar.html',
  styleUrl: './top-navbar.scss',
})
export class TopNavbar {
  constructor(private readonly _auth: AuthService) {}

  logout(): void {
    this._auth.logout();
  }
}
