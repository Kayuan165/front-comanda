import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.interface';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private apiUrl = 'http://localhost:3000/product';

  constructor(private http: HttpClient) {}

  getProdutos(filtros?: { ativo: string }): Observable<Produto[]> {
    let params = new HttpParams();

    if (filtros?.ativo) {
      params = params.set('ativo', filtros.ativo);
    }

    return this.http.get<Produto[]>(this.apiUrl, { params });
  }

  getAllProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/list`);
  }

  deletarProduto(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  editarProduto(produto: Produto): Observable<Produto> {
    return this.http.patch<Produto>(
      `${this.apiUrl}/update/:${produto._id}`,
      produto
    );
  }

  criarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.apiUrl}/create`, produto);
  }
}
