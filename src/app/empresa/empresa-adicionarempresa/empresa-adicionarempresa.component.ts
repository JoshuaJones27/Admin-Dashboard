import { Component } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';

// Decorator that marks this class as an Angular component
@Component({
  selector: 'app-empresa-adicionarempresa',
  templateUrl: './empresa-adicionarempresa.component.html',
  styleUrls: ['./empresa-adicionarempresa.component.scss'],
})
export class EmpresaAdicionarempresaComponent {
  // Properties bound to form fields
  name: string | undefined;
  connectionName: string | undefined;
  connectionPassword: string | undefined;
  confirmConnectionPassword: string | undefined;

  // Inject the EmpresaService for API calls
  constructor(private empresaService: EmpresaService) {}

  // Handler for input focus: clears the placeholder
  onFocus(event: FocusEvent) {
    const target = event.target as HTMLInputElement;
    if (target) {
      target.placeholder = '';
    }
  }

  // Handler for input blur: restores the placeholder based on input id
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

  // Handler for form submission
  onSubmit(event: Event) {
    console.log('Ola do onsubmit');

    event.preventDefault(); // Prevent default form submission

    // Check if all required fields are filled
    if (
      this.name &&
      this.connectionName &&
      this.connectionPassword &&
      this.confirmConnectionPassword
    ) {
      // Call the service to register the company
      this.empresaService
        .postRegisterCompany(
          this.name,
          this.connectionName,
          this.connectionPassword,
          this.confirmConnectionPassword
        )
        .subscribe(
          (response) => {
            console.log(response);
            // Redirect to dashboard on success
            window.location.href = '/dashboard';
          },
          (error) => {
            // Log error details
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            console.log(error.config);
            // Handle error here
          }
        );
    }
  }
}
