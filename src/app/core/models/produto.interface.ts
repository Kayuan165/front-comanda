export interface Produto {
  id: string;
  descricao: string;
  preco: number;
  numero: number;
  ativo: boolean;
  adicional: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
