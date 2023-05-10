import { Component } from '@angular/core';
import { UtilizadorService } from 'src/app/services/utilizador.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-utilizadores-registarutilizador',
  templateUrl: './utilizadores-registarutilizador.component.html',
  styleUrls: ['./utilizadores-registarutilizador.component.scss'],
})
export class UtilizadoresRegistarutilizadorComponent {
  username: string | undefined;
  password: string | undefined;
  confPassword: string | undefined;
  userType: number | null = null;

  defaultUsername: string = '';
  defaultPassword: string = '';
  defaultConfPassword: string = '';
  defaultUserType: number | null = null;

  constructor(
    private utilizadorService: UtilizadorService,
    private snackBar: MatSnackBar
  ) {}

  onFocus(event: FocusEvent) {
    const target = event.target as HTMLInputElement;
    if (target) {
      target.placeholder = '';
    }
  }

  onBlur(event: FocusEvent) {
    const target = event.target as HTMLInputElement;
    if (target) {
      if (target.id === 'username') {
        target.placeholder = 'Nome Utilizador';
      } else if (target.id === 'password') {
        target.placeholder = 'Palavra Passe';
      } else if (target.id === 'confPassword') {
        target.placeholder = 'Confirmar Palavra Passe';
      } else if (target.id === 'userType') {
        target.placeholder = 'Tipo Utilizador';
      }
    }
  }

  onSubmit(event: Event) {
    console.log('Ola do onsubmit');

    event.preventDefault(); // prevent the default form submission behavior

    if (this.username && this.password && this.confPassword && this.userType) {
      this.utilizadorService
        .postRegisterUser(
          this.username,
          this.password,
          this.confPassword,
          this.userType
        )
        .subscribe(
          (response) => {
            console.log(response);
            this.snackBar.open('Pedido criado com sucesso!', 'Fechar', {
              duration: 3000,
            });
            this.username = this.defaultUsername;
            this.password = this.defaultPassword;
            this.confPassword = this.defaultConfPassword;
            this.userType = this.defaultUserType;
          },
          (error) => {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            console.log(error.config);
            this.snackBar.open('Ocorreu um erro ao criar o pedido.', 'Fechar', {
              duration: 3000,
            });
          }
        );
    }
  }
}
