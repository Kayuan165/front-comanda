import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../../core/services/user.service';
import { Usuario } from '../../../core/models/usuario.interface';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-usuarios-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './usuarios-create.html',
  styleUrl: './usuarios-create.scss',
})
export class UsuariosCreate {
  usuarioForm: FormGroup;
  isLoading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
  ) {
    this.usuarioForm = this.fb.group({
      nome: [''],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.usuarioForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const usuario: Usuario = this.usuarioForm.value;

    this.usuarioService.createUsuario(usuario).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('Usuário criado com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.usuarioForm.reset();
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open('Erro ao criar usuário!', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  markAllAsTouched(): void {
    Object.values(this.usuarioForm.controls).forEach((control) => {
      control.markAllAsTouched();
    });
  }

  get nome() {
    return this.usuarioForm.get('nome');
  }

  get email() {
    return this.usuarioForm.get('email');
  }

  get senha() {
    return this.usuarioForm.get('senha');
  }
}
