import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

// Tipos do que a API devolve (só os campos que usamos)
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: { city: string };
  company: { name: string };
}

export interface Post {
  id?: number;
  userId: number;
  title: string;
  body: string;
}

// API pública de testes: https://jsonplaceholder.typicode.com
const API = 'https://jsonplaceholder.typicode.com';

// As chamadas HTTP ficam num serviço, não no componente.
// O componente só pede os dados e decide o que mostrar.
@Injectable({ providedIn: 'root' })
export class UsersApiService {
  // HttpClient só pode ser injetado porque o app.config.ts tem provideHttpClient()
  private readonly http = inject(HttpClient);

  // GET: busca uma lista. <User[]> diz ao TypeScript o tipo da resposta.
  // Os métodos devolvem Observable: a requisição só acontece quando alguém der subscribe().
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API}/users`, { params: { _limit: 5 } });
  }

  // GET com parâmetro na URL
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${API}/users/${id}`);
  }

  // POST: envia dados no corpo da requisição.
  // A jsonplaceholder finge que salvou e devolve o objeto com um id novo.
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${API}/posts`, post);
  }
}
