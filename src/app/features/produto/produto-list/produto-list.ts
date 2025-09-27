import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Produto } from '../../../core/models/produto.interface';
import { ProdutoService } from '../../../core/services/produto.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CurrencyBrPipe } from '../../../shared/pipes/currency-br.pipe';
import { ModalDelete } from '../../../shared/modal/modal-delete/modal-delete';
import { ModalEdit } from '../../../shared/modal/modal-edit/modal-edit';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-produto-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CurrencyBrPipe,
    ModalDelete,
    ModalEdit,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  standalone: true,
  templateUrl: './produto-list.html',
  styleUrl: './produto-list.scss',
})
export class ProdutoList implements OnInit {
  produtos: Produto[] = [];
  loading = true;
  error = '';

  modalEditOpen = false;
  modalDeleteOpen = false;
  selectedProduto: Produto | null = null;

  formEdit: FormGroup;

  constructor(
    private produtoService: ProdutoService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.formEdit = this.fb.group({
      _id: [''],
      descricao: [''],
      preco: [0, [Validators.min(0)]],
      numero: [0, [Validators.min(0)]],
      ativo: [true],
      adicional: [false],
    });
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.getAllProdutos().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Erro ao carregar produtos.';
        this.loading = false;
        this.snackBar.open('Erro ao carregar produtos', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
        this.cdr.detectChanges();
      },
    });
  }

  abrirModalEdit(produto: Produto): void {
    this.selectedProduto = produto;
    this.formEdit.patchValue(produto);
    this.modalEditOpen = true;
  }

  abrirModalDelete(produto: Produto): void {
    this.selectedProduto = produto;
    this.modalDeleteOpen = true;
  }

  fecharModais(): void {
    this.modalEditOpen = false;
    this.modalDeleteOpen = false;
    this.selectedProduto = null;
    this.carregarProdutos();
    this.cdr.detectChanges();
  }

  confirmarEdicao(produto: Produto): void {
    this.produtoService.editarProduto(produto).subscribe({
      next: () => {
        this.snackBar.open('Produto editado com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.fecharModais();
        this.carregarProdutos();
      },
      error: () => {
        this.snackBar.open('Erro ao editar produto', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  confirmarExclusao(): void {
    if (this.selectedProduto) {
      this.produtoService.deletarProduto(this.selectedProduto._id).subscribe({
        next: () => {
          this.snackBar.open('Produto excluído com sucesso!', 'Fechar', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
          this.fecharModais();
          this.carregarProdutos();
        },
        error: () => {
          this.snackBar.open('Erro ao excluir produto', 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        },
      });
    }
  }
}
