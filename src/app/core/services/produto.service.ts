import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.interface';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private apiUrl = 'http://localhost:3000/product';

  constructor(private http: HttpClient) {}

  getAllProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/list`);
  }
}
