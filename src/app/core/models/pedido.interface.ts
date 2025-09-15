import { ItemPedido } from './item-pedido.interface';
import { PagamentoItem } from './pagamento.interface';

export interface Pedido {
  _id?: string;
  usuario: string;
  itens: ItemPedido[];
  pagamentos: PagamentoItem[];
  valorTotal: number;
  agendado?: boolean;
  horarioAgendamento?: string;
  pago?: boolean;
  cliente: string;
  observacao?: string;
  status?: boolean;
}

export interface CreatePedidoDto {
  usuario: string;
  itens: ItemPedido[];
  pagamentos: PagamentoItem[];
  valorTotal: number;
  agendado: boolean;
  horarioAgendamento?: string;
  pago: boolean;
  cliente: string;
  observacao?: string;
  status: boolean;
}
