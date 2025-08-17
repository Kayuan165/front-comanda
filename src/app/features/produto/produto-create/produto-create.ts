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

@Component({
  selector: 'app-produto-create',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './produto-create.html',
  styleUrl: './produto-create.scss',
})
export class ProdutoCreate {
  produtoForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private produtoService: ProdutoService, private fb: FormBuilder) {
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
    this.errorMessage = null;
    this.successMessage = null;

    const produto: Produto = this.produtoForm.value;

    this.produtoService.criarProduto(produto).subscribe({
      next: () => {
        this.successMessage = 'Produto cadastrado com sucesso!';
        this.isLoading = false;
        this.produtoForm.reset();
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Erro ao cadastrar o produto!';
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
