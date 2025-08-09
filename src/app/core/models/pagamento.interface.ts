export interface PagamentoItem {
  tipo: 'dinheiro' | 'pix' | 'cartão crédito' | 'cartão débito';
  valor: number;
  trocoPara?: number;
}
