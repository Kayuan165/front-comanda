import { AdicionalItem } from './item-adicional.interface';
import { Produto } from './produto.interface';

export interface ItemPedido {
  produto: string | Produto;
  quantidade: number;
  precoUnitario: number;
  adicionais?: AdicionalItem[];
  nome: string;
}
