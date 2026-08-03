import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MetricsService } from '../../../core/services/metrics.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { Cards } from '../../../shared/cards/cards';
import { CurrencyBrPipe } from '../../../shared/pipes/currency-br.pipe';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatIcon, Cards, MatButtonModule],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  pedidosDoDia: number = 0;
  valorTotalRecebido: string = '0';
  qtdCancelada: number = 0;
  loading: boolean = true;
  error: boolean = false;

  constructor(
    private metricsService: MetricsService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.carregarPedidosDoDia();
    this.carregarValorRecebido();
    this.carregarPedidosCancelados();
  }

  carregarPedidosDoDia(): void {
    this.loading = false;
    this.error = false;

    this.metricsService.getQtdPedidos().subscribe({
      next: (response) => {
        this.pedidosDoDia = response;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.error = true;
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  carregarValorRecebido(): void {
    this.loading = false;
    this.error = false;

    this.metricsService.getQtdRecebida().subscribe({
      next: (response) => {
        this.valorTotalRecebido = response;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.error = true;
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  recarregar(): void {
    this.carregarDados();
  }

  carregarPedidosCancelados(): void {
    this.loading = false;
    this.error = false;

    this.metricsService.getQtdPedidosCancelados().subscribe({
      next: (response) => {
        this.qtdCancelada = response;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.error = true;
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
