import { HttpClient } from '@angular/common/http';
import {
  inject,
  Injectable,
  signal,
  Inject,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { isPlatformBrowser } from '@angular/common';

export interface LoginResponse {
  access_token: string;
  user?: {
    _id: string;
    email: string;
    nome: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {
  private apiUrl = 'http://localhost:3000/auth';
  private http = inject(HttpClient);
  private router = inject(Router);
  private storageService = inject(StorageService);
  private platformId = inject(PLATFORM_ID);
  private tokenCheckInterval: ReturnType<typeof setInterval> | null = null;

  isAuthenticated = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkAuthState();
      this.startTokenExpirationCheck();
    }
  }

  ngOnDestroy(): void {
    this.stopTokenExpirationCheck();
  }

  login(email: string, senha: string): Observable<LoginResponse> {
    this.isLoading.set(true);

    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { email, senha })
      .pipe(
        tap({
          next: (res) => {
            this.handleLoginSuccess(res);
            this.isLoading.set(false);
          },
          error: (error) => {
            this.handleLoginError(error);
            this.isLoading.set(false);
          },
        }),
      );
  }

  logout(): void {
    this.storageService.removeItem('token');
    this.storageService.removeItem('user');
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (this.isAuthenticated()) {
      return true;
    }

    const token = this.storageService.getItem('token');
    if (token) {
      if (!this.isTokenExpired(token)) {
        this.isAuthenticated.set(true);
        return true;
      }
      this.storageService.removeItem('token');
      this.storageService.removeItem('user');
    }

    this.isAuthenticated.set(false);
    return false;
  }

  getToken(): string | null {
    return this.storageService.getItem('token');
  }

  getUser(): any {
    const user = this.storageService.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserId(): string | null {
    const user = this.getUser();
    return user ? user._id : null;
  }

  private handleLoginSuccess(response: LoginResponse): void {
    this.storageService.setItem('token', response.access_token);

    if (response.user) {
      this.storageService.setItem('user', JSON.stringify(response.user));
    }

    this.isAuthenticated.set(true);
  }

  private handleLoginError(error: any): void {
    console.error('Login error:', error);
    this.isAuthenticated.set(false);
  }

  private checkInitialAuthState(): boolean {
    const token = this.storageService.getItem('token');
    return !!token && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  private checkAuthState(): void {
    this.isAuthenticated.set(this.checkInitialAuthState());
  }

  private startTokenExpirationCheck(): void {
    this.tokenCheckInterval = setInterval(() => {
      const token = this.storageService.getItem('token');
      if (token && this.isTokenExpired(token)) {
        console.log('Token expirado. Realizando logout automático.');
        this.logout();
      }
    }, 60000);
  }

  private stopTokenExpirationCheck(): void {
    if (this.tokenCheckInterval) {
      clearInterval(this.tokenCheckInterval);
      this.tokenCheckInterval = null;
    }
  }

  getTokenRemainingTime(): number | null {
    const token = this.storageService.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const remainingTime = payload.exp * 1000 - Date.now();
      return remainingTime > 0 ? remainingTime : 0;
    } catch {
      return null;
    }
  }
}
