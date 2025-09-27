import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MetricsService } from '../../../core/services/metrics.service';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { Cards } from '../../../shared/cards/cards';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatIcon, Cards],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  pedidosDoDia: number = 0;
  loadingPedidos: boolean = true;
  errorPedidos: boolean = false;

  constructor(
    private metricsService: MetricsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarPedidosDoDia();
  }

  carregarPedidosDoDia(): void {
    this.loadingPedidos = false;
    this.errorPedidos = false;

    this.metricsService.getQtdPedidos().subscribe({
      next: (response) => {
        this.pedidosDoDia = response;
        this.loadingPedidos = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.errorPedidos = true;
        this.loadingPedidos = false;
        this.cdr.detectChanges();
      },
    });
  }

  recarregar(): void {
    this.carregarPedidosDoDia();
  }
}
