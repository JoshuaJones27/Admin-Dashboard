import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  onFocus(event: FocusEvent) {
    const target = event.target as HTMLInputElement;
    if (target) {
      target.placeholder = '';
    }
  }

  onBlur(event: FocusEvent) {
    const target = event.target as HTMLInputElement;
    if (target) {
      if (target.id === 'login') {
        target.placeholder = 'Nome Utilizador';
      } else if (target.id === 'password') {
        target.placeholder = 'Palavra Passe';
      }
    }
  }
}
