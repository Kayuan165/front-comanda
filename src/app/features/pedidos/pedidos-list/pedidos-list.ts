import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Pedido } from '../../../core/models/pedido.interface';
import { PedidoService } from '../../../core/services/pedido.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VizualizarPedido } from '../../../shared/modal/vizualizar-pedido/vizualizar-pedido';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pedidos-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    VizualizarPedido,
    MatIconModule,
  ],
  templateUrl: './pedidos-list.html',
  styleUrl: './pedidos-list.scss',
})
export class PedidosList implements OnInit {
  pedidos: Pedido[] = [];
  loading: boolean = true;
  error: string = '';
  modalVizualizarOpen: boolean = false;
  selectedPedido: Pedido | null = null;

  constructor(
    private pedidoService: PedidoService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos(): void {
    this.loading = true;
    this.pedidoService.getAllPedidos().subscribe({
      next: (pedidos) => {
        this.pedidos = pedidos;
        this.loading = false;
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Erro ao carregar pedidos.';
        this.loading = false;
        this.snackBar.open('Erro ao carregar pedidos.', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
        this.cdr.detectChanges();
      },
    });
  }

  abrirModalVizualizar(pedido: Pedido): void {
    this.selectedPedido = pedido;
    this.modalVizualizarOpen = true;
  }

  fecharModalVizualizar(): void {
    this.modalVizualizarOpen = false;
    this.selectedPedido = null;
  }

  finalizarPedido(pedido: Pedido): void {
    const pedidoAtualizado = { ...pedido, finalizado: true };

    this.pedidoService.editarPedido(pedidoAtualizado).subscribe({
      next: () => {
        this.snackBar.open('Pedido finalizado com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.fecharModalVizualizar();
        this.cdr.markForCheck();
        this.carregarPedidos();
      },
      error: (err) => {
        this.snackBar.open('Erro ao finalizar pedido.', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  cancelarPedido(pedido: Pedido): void {
    const pedidoAtualizado = { ...pedido, finalizado: false };

    this.pedidoService.editarPedido(pedidoAtualizado).subscribe({
      next: () => {
        this.snackBar.open('Pedido cancelado com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.fecharModalVizualizar();
        this.carregarPedidos();
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao cancelar pedido:', err);
        this.snackBar.open('Erro ao cancelar pedido.', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  getStatusPedido(pedido: Pedido): string {
    if (pedido.finalizado === true) {
      return 'Finalizado';
    } else if (pedido.finalizado === false) {
      return 'Cancelado';
    } else {
      return 'Em Andamento';
    }
  }

  getStatusClass(pedido: Pedido): string {
    if (pedido.finalizado === true) {
      return 'success';
    } else if (pedido.finalizado === false) {
      return 'danger';
    } else {
      return 'warning';
    }
  }

  podeFinalizarPedido(pedido: Pedido): boolean {
    return pedido.finalizado !== true && pedido.finalizado !== false;
  }

  podeCancelarPedido(pedido: Pedido): boolean {
    return pedido.finalizado !== true && pedido.finalizado !== false;
  }

  formatarData(data: string | Date): string {
    if (!data) return 'N/A';
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  contarItensPedido(pedido: Pedido): number {
    if (!pedido.itens || !Array.isArray(pedido.itens)) {
      return 0;
    }
    return pedido.itens.length;
  }

  formatarValorTotal(valor: number): string {
    if (!valor) return 'N/A';
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
