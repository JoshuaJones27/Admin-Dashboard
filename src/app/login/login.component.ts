import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;

  constructor(private authService: AuthService) {}

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

  onSubmit(event: Event) {
    console.log('Ola do onsubmit');
    event.preventDefault(); // prevent the default form submission behavior
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe(
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
