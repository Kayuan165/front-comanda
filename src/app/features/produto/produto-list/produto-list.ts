import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Produto } from '../../../core/models/produto.interface';
import { ProdutoService } from '../../../core/services/produto.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyBrPipe } from '../../../shared/pipes/currency-br.pipe';

@Component({
  selector: 'app-produto-list',
  imports: [CommonModule, ReactiveFormsModule, CurrencyBrPipe],
  standalone: true,
  templateUrl: './produto-list.html',
  styleUrl: './produto-list.scss',
})
export class ProdutoList implements OnInit {
  produtos: Produto[] = [];
  loading = true;
  error = '';

  constructor(private produtoService: ProdutoService) {
  }

  ngOnInit(): void {
    this.produtoService.getAllProdutos().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.error = 'Erro ao carregar produtos.';
        this.loading = false;
      },
    });
  }
}
