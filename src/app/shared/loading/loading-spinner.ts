import { Component, Input } from '@angular/core';

/**
 * Componente global de loading com animação de dots pulsantes.
 * Construído apenas com SCSS — sem imagens externas.
 *
 * API pública:
 * @Input() size: 'small' | 'medium' | 'large' = 'medium'
 *   - 'small'  → dots de 6px, ideal para containers menores
 *   - 'medium' → dots de 10px, valor padrão
 *   - 'large'  → dots de 14px, para páginas completas
 *
 * @Input() visible: boolean = true
 *   - Controla visibilidade com transição fade-out suave
 *
 * @Input() message: string = 'Carregando...'
 *   - Texto exibido abaixo dos dots; padrão "Carregando..."
 *
 * @Input() overlay: boolean = false
 *   - Quando true, exibe overlay fixo semi-transparente bloqueante
 *   - Bloqueia interações de clique com conteúdo ao fundo
 *
 * Uso básico:
 *   <app-loading-spinner [visible]="isLoading" />
 *
 * Com mensagem customizada:
 *   <app-loading-spinner [visible]="loading" [message]="'Carregando pedidos...'" />
 *
 * Small em container:
 *   <app-loading-spinner size="small" [visible]="loadingProdutos" [message]="'Carregando produtos...'" />
 *
 * Overlay bloqueante:
 *   <app-loading-spinner [overlay]="true" [visible]="salvando" [message]="'Salvando...'" />
 *
 * NÃO usar dentro de botões — usar mat-progress-spinner para micro-interação de submit.
 * NÃO substituir o skeleton do componente cards (padrão superior de UX para métricas).
 */
@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [],
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.scss',
})
export class LoadingSpinnerComponent {
  /** Tamanho dos dots pulsantes. Padrão: 'medium' (10px) */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  /** Controla visibilidade com transição fade. Padrão: true */
  @Input() visible: boolean = true;

  /** Texto abaixo da animação. Padrão: 'Carregando...' */
  @Input() message: string = 'Carregando...';

  /** Quando true, exibe overlay fixo bloqueante. Padrão: false */
  @Input() overlay: boolean = false;
}
