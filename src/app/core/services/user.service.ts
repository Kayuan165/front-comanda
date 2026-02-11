import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.interface';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuario';
  private apiUrlAuth = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/list`);
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrlAuth}/register`, usuario);
  }

  deletarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  editarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.patch<Usuario>(
      `${this.apiUrl}/update/:${usuario._id}`,
      usuario,
    );
  }
}
