import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Usuario } from '../../../core/models/usuario.interface';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UsuarioService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ModalDelete } from '../../../shared/modal/modal-delete/modal-delete';
import { ModalEdit } from '../../../shared/modal/modal-edit/modal-edit';
import { LoadingSpinnerComponent } from '../../../shared/loading/loading-spinner';

@Component({
  selector: 'app-usuarios-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalDelete,
    ModalEdit,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    LoadingSpinnerComponent,
  ],
  standalone: true,
  templateUrl: './usuarios-list.html',
  styleUrl: './usuarios-list.scss',
})
export class UsuariosList implements OnInit {
  usuarios: Usuario[] = [];
  loading: boolean = true;
  error: string = '';

  modalEditOpen = false;
  modalDeleteOpen = false;
  selectedUsuario: Usuario | null = null;

  formEdit: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
  ) {
    this.formEdit = this.fb.group({
      _id: [''],
      nome: [''],
      email: ['', [Validators.email]],
    });
  }

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.loading = true;
    this.error = '';

    this.usuarioService.getAllUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.loading = false;
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Erro ao carregar usuários.';
        this.loading = false;
        this.snackBar.open(this.error, 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
    });
  }

  abrirModalEdit(usuario: Usuario): void {
    this.selectedUsuario = usuario;
    this.formEdit.patchValue(usuario);
    this.modalEditOpen = true;
  }

  abrirModalDelete(usuario: Usuario): void {
    this.selectedUsuario = usuario;
    this.modalDeleteOpen = true;
  }

  fecharModal(): void {
    this.modalEditOpen = false;
    this.modalDeleteOpen = false;
    this.selectedUsuario = null;
    this.carregarUsuarios();
    this.cdr.detectChanges();
  }

  confirmarEdit(usuario: Usuario): void {
    this.usuarioService.editarUsuario(usuario).subscribe({
      next: () => {
        this.snackBar.open('Usuário editado com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.fecharModal();
        this.carregarUsuarios();
      },
      error: () => {
        this.snackBar.open('Erro ao editar usuário', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  confirmarDelete(): void {
    if (this.selectedUsuario) {
      this.usuarioService.deletarUsuario(this.selectedUsuario._id).subscribe({
        next: () => {
          this.snackBar.open('Usuário excluído com sucesso!', 'Fechar', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
          this.fecharModal();
          this.carregarUsuarios();
        },
        error: () => {
          this.snackBar.open('Erro ao excluir usuário', 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        },
      });
    }
  }
}
