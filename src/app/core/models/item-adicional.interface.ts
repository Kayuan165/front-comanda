import { Produto } from "./produto.interface";

export interface AdicionalItem {
  produto: string | Produto;
  nome: string;
  quantidade: number;
  precoUnitario: number;
  observacao?: string;
}
