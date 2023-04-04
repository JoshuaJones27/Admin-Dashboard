import { Component } from '@angular/core';
import { EmpresaService } from '../services/empresa.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss'],
})
export class EmpresaComponent {
  name: string | undefined;
  connectionName: string | undefined;
  connectionPassword: string | undefined;
  confirmConnectionPassword: string | undefined;

  constructor(private empresaService: EmpresaService) {}

  onFocus(event: FocusEvent) {
    const target = event.target as HTMLInputElement;
    if (target) {
      target.placeholder = '';
    }
  }

  onBlur(event: FocusEvent) {
    const target = event.target as HTMLInputElement;
    if (target) {
      if (target.id === 'name') {
        target.placeholder = 'Nome da Empresa';
      } else if (target.id === 'connectionName') {
        target.placeholder = 'Nome de Utilizador';
      } else if (target.id === 'connectionPassword') {
        target.placeholder = 'Palavra Passe';
      } else if (target.id === 'confirmConnectionPassword') {
        target.placeholder = 'Confirmar Palavra Passe';
      }
    }
  }

  onSubmit(event: Event) {
    console.log('Ola do onsubmit');

    event.preventDefault(); // prevent the default form submission behavior

    if (
      this.name &&
      this.connectionName &&
      this.connectionPassword &&
      this.confirmConnectionPassword
    ) {
      this.empresaService
        .post(
          this.name,
          this.connectionName,
          this.connectionPassword,
          this.confirmConnectionPassword
        )
        .subscribe(
          (response) => {
            console.log(response);
            // Redirect to the dashboard on successful login
            window.location.href = '/dashboard';
          },
          (error) => {
            console.log(error);
            // Handle login error here
          }
        );
    }
  }
}
