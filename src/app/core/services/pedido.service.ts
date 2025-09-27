import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.interface';
import { CreatePedidoDto, Pedido } from '../models/pedido.interface';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private apiUrl = 'http://localhost:3000/pedidos';

  constructor(private http: HttpClient) {}

  getAllPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/list`);
  }

  getPedidoById(id: string): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/list:${id}`);
  }

  criarPedido(pedido: CreatePedidoDto): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}/create`, pedido);
  }

  editarPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.patch<Pedido>(
      `${this.apiUrl}/update:${pedido._id}`,
      pedido
    );
  }

  deletarPedido(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/del:${id}`);
  }
}
