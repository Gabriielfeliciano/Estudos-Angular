import { Component } from '@angular/core';
import { ReactiveForm } from './reactive-form';
import { TemplateForm } from './template-form';

// Só junta os dois formulários lado a lado para comparar
@Component({
  selector: 'app-forms-demo',
  imports: [TemplateForm, ReactiveForm],
  templateUrl: './forms-demo.html',
  styleUrl: './forms-demo.css',
})
export class FormsDemo {}
