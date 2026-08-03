import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-top-navbar',
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  standalone: true,
  templateUrl: './top-navbar.html',
  styleUrl: './top-navbar.scss',
})
export class TopNavbar {
  userName: string | null = null;
  constructor(private readonly _auth: AuthService) {
    this.userName = this._auth.getUser()?.nome ?? null;
  }

  logout(): void {
    this._auth.logout();
  }
}
