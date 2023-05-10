import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilizadorService {
  private baseUrl = 'https://localhost:7017/api/Users/';

  constructor() {}

  postRegisterUser(
    username: string,
    password: string,
    confPassword: string,
    userType: number
  ): Observable<any> {
    console.log('Ola do auth service');
    console.log(this.baseUrl);

    const promise = axios.post(`${this.baseUrl}RegisterUser`, {
      username,
      password,
      confPassword,
      userType,
    });

    return from(promise);
  }
}
