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

@Component({
  selector: 'app-produto-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CurrencyBrPipe,
    ModalDelete,
    ModalEdit,
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

  constructor(private produtoService: ProdutoService, private fb: FormBuilder) {
    this.formEdit = this.fb.group({
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
      },
      error: (err) => {
        this.error = 'Erro ao carregar produtos.';
        this.loading = false;
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
  }

  confirmarEdicao(produto: Produto): void {
    this.produtoService.editarProduto(produto).subscribe({
      next: () => this.fecharModais(),
      error: () => (this.error = 'Erro ao editar produto.'),
    });
  }

  confirmarExclusao(): void {
    if (this.selectedProduto) {
      this.produtoService
        .deletarProduto(Number(this.selectedProduto.id))
        .subscribe({
          next: () => this.fecharModais(),
          error: () => (this.error = 'Erro ao excluir produto.'),
        });
    }
  }
}
