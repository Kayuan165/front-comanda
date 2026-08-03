import { Component, inject, signal, PLATFORM_ID, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
  ],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  loading = signal<boolean>(false);
  errorMessage = signal<string>('');
  showPassword = false;

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  submit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      this.errorMessage.set('Por favor, preencha o formulário corretamente.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    const { email, senha } = this.loginForm.getRawValue();

    this.authService
      .login(email, senha)
      .pipe(
        catchError((error) => {
          this.handleError(error);
          return of(null);
        }),
        finalize(() => this.loading.set(false)),
      )
      .subscribe((response) => {
        if (response) {
          this.handleSuccess();
        }
      });
  }

  private handleSuccess(): void {
    this.router.navigate(['/home']);
  }

  private handleError(error: any): void {
    const message =
      error?.error?.message || error?.status === 401
        ? 'E-mail ou senha incorretos.'
        : 'Erro ao realizar login. Tente novamente.';

    this.errorMessage.set(message);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }
}
