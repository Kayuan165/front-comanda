import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Pedido } from '../../../core/models/pedido.interface';

@Component({
  standalone: true,
  selector: 'app-vizualizar-pedido',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
  ],
  templateUrl: './vizualizar-pedido.html',
  styleUrl: './vizualizar-pedido.scss',
})
export class VizualizarPedido {
  @Input() isOpen: boolean = false;
  @Input() pedido: Pedido | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() finalizarPedido = new EventEmitter<Pedido>();
  @Output() cancelarPedido = new EventEmitter<Pedido>();

  mostrandoConfirmacaoFinalizar: boolean = false;
  mostrandoConfirmacaoCancelar: boolean = false;

  onClose(): void {
    this.mostrandoConfirmacaoFinalizar = false;
    this.mostrandoConfirmacaoCancelar = false;
    this.close.emit();
  }

  solicitarConfirmarFinalizar(): void {
    this.mostrandoConfirmacaoFinalizar = true;
    this.mostrandoConfirmacaoCancelar = false;
  }

  solicitarConfirmarCancelar(): void {
    this.mostrandoConfirmacaoFinalizar = false;
    this.mostrandoConfirmacaoCancelar = true;
  }

  cancelarConfirmacaoFinalizar(): void {
    this.mostrandoConfirmacaoFinalizar = false;
  }

  cancelarConfirmacaoCancelar(): void {
    this.mostrandoConfirmacaoCancelar = false;
  }

  confirmarFinalizarPedido(): void {
    if (this.pedido) {
      this.finalizarPedido.emit(this.pedido);
      this.mostrandoConfirmacaoFinalizar = false;
    }
  }

  confirmarCancelarPedido(): void {
    if (this.pedido) {
      this.cancelarPedido.emit(this.pedido);
      this.mostrandoConfirmacaoCancelar = false;
    }
  }

  getStatusPedido(pedido: Pedido): string {
    if (pedido.finalizado === true) {
      return 'Finalizado';
    } else if (pedido.finalizado === false) {
      return 'Cancelado';
    } else {
      return 'Em andamento';
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

  podeFinalizarPedido(pedido: Pedido): boolean {
    return pedido.finalizado !== true && pedido.finalizado !== false;
  }

  podeCancelarPedido(pedido: Pedido): boolean {
    return pedido.finalizado !== true && pedido.finalizado !== false;
  }

  formatarMoeda(valor: number): string {
    if (!valor) return 'R$ 0,00';
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
