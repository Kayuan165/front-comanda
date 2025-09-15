import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.interface';
import { CreatePedidoDto } from '../models/pedido.interface';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private apiUrl = 'http://localhost:3000/pedidos';

  constructor(private http: HttpClient) {}

  getAllPedidos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/list`);
  }

  getPedidoById(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/list:${id}`);
  }

  criarPedido(pedido: CreatePedidoDto): Observable<Produto> {
    return this.http.post<Produto>(`${this.apiUrl}/create`, pedido);
  }

  editarPedido(pedido: Produto): Observable<Produto> {
    return this.http.patch<Produto>(
      `${this.apiUrl}/update:${pedido._id}`,
      pedido
    );
  }

  deletarPedido(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/del:${id}`);
  }
}
