export interface Produto {
  descricao: string;
  preco: number;
  numero: number;
  ativo: boolean;
  adicional: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
