import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

// Reactive: o formulário é montado na classe (TypeScript).
// O HTML só liga cada campo ao controle com formControlName.
@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule, JsonPipe], // ReactiveFormsModule traz formGroup e formControlName
  templateUrl: './reactive-form.html',
  styleUrl: './form.css',
})
export class ReactiveForm {
  private readonly fb = inject(FormBuilder);

  // FormGroup com um FormControl para cada campo: [valor inicial, validadores]
  // nonNullable: ao resetar, volta para o valor inicial em vez de null
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    age: [18, [Validators.required, Validators.min(16)]],
    level: ['junior'],
  });

  sent = '';

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // mostra os erros de todos os campos
      return;
    }
    // getRawValue(): o objeto com todos os valores, já tipado
    const { name, age } = this.form.getRawValue();
    this.sent = `Cadastro enviado: ${name}, ${age} anos`;
    this.form.reset();
  }
}
