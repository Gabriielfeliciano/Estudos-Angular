import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Post, User, UsersApiService } from './users-api.service';

@Component({
  selector: 'app-http-demo',
  imports: [FormsModule, JsonPipe],
  templateUrl: './http-demo.html',
  styleUrl: './http-demo.css',
})
export class HttpDemo {
  private readonly api = inject(UsersApiService);

  users: User[] = [];
  selected?: User;
  createdPost?: Post;
  postTitle = 'Estudando HttpClient';

  // Estados da tela enquanto a requisição acontece
  loading = false;
  error = '';

  loadUsers() {
    this.startRequest();
    // subscribe(): dispara a requisição e recebe a resposta
    this.api.getUsers().subscribe({
      next: (users) => {
        this.users = users; // sucesso
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => this.handleError(err), // falha
    });
  }

  selectUser(id: number) {
    this.startRequest();
    this.api.getUser(id).subscribe({
      next: (user) => {
        this.selected = user;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => this.handleError(err),
    });
  }

  // Pede um usuário que não existe para ver o tratamento de erro (404)
  forceError() {
    this.selected = undefined;
    this.selectUser(999);
  }

  createPost() {
    this.startRequest();
    this.api.createPost({ userId: 1, title: this.postTitle, body: 'Post criado pelo exemplo' }).subscribe({
      next: (post) => {
        this.createdPost = post;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => this.handleError(err),
    });
  }

  private startRequest() {
    this.loading = true;
    this.error = '';
  }

  private handleError(err: HttpErrorResponse) {
    this.loading = false;
    // err.status: código HTTP (404 = não encontrado, 500 = erro no servidor, 0 = sem conexão)
    this.error = `Erro ${err.status}: ${err.status === 404 ? 'não encontrado' : err.message}`;
  }
}
