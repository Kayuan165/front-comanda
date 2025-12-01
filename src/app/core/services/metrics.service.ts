import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MetricsService {
  private apiUrl = 'http://localhost:3000/metrics';

  constructor(private http: HttpClient) {}

  getQtdPedidos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pedidos`);
  }

  getQtdRecebida(): Observable<any> {
    return this.http.get(`${this.apiUrl}/valorTotal`);
  }
}
