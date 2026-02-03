import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProdutoService } from '../../../core/services/produto.service';
import { Produto } from '../../../core/models/produto.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-produto-create',
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
  ],
  standalone: true,
  templateUrl: './produto-create.html',
  styleUrl: './produto-create.scss',
})
export class ProdutoCreate {
  produtoForm: FormGroup;
  isLoading = false;

  constructor(
    private produtoService: ProdutoService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.produtoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(3)]],
      preco: [0, [Validators.required, Validators.min(0)]],
      numero: [0, [Validators.required, Validators.min(0)]],
      ativo: [true],
      adicional: [false],
    });
  }

  onSubmit(): void {
    if (this.produtoForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const produto: Produto = this.produtoForm.value;

    this.produtoService.criarProduto(produto).subscribe({
      next: () => {
        this.snackBar.open('Produto cadastrado com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.isLoading = false;
        this.produtoForm.reset({ ativo: true, adicional: false });
      },
      error: (err) => {
        this.snackBar.open(
          err.error?.message || 'Erro ao cadastrar o produto!',
          'Fechar',
          { duration: 3000, panelClass: ['error-snackbar'] }
        );
        this.isLoading = false;
      },
    });
  }

  markAllAsTouched(): void {
    Object.values(this.produtoForm.controls).forEach((control) => {
      control.markAllAsTouched();
    });
  }

  get descricao(): AbstractControl {
    return this.produtoForm.get('descricao') as AbstractControl;
  }

  get preco(): AbstractControl {
    return this.produtoForm.get('preco') as AbstractControl;
  }

  get numero(): AbstractControl {
    return this.produtoForm.get('numero') as AbstractControl;
  }
}
