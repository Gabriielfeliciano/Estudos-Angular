import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

// Template-driven: o formulário é montado no HTML com ngModel.
// A classe só guarda os valores e trata o envio.
@Component({
  selector: 'app-template-form',
  imports: [FormsModule, JsonPipe], // FormsModule traz ngModel, ngForm e os validadores do HTML
  templateUrl: './template-form.html',
  styleUrl: './form.css',
})
export class TemplateForm {
  // Modelo ligado aos campos com [(ngModel)]
  student = { name: '', email: '', level: 'junior' };

  sent = '';

  // O NgForm chega pelo (ngSubmit)="submit(f)"
  submit(form: NgForm) {
    if (form.invalid) return;
    this.sent = `Cadastro enviado: ${this.student.name} (${this.student.email})`;
    form.resetForm({ name: '', email: '', level: 'junior' });
  }
}
