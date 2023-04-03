import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:7017/api/Users/';
  // private httpagent = new this.httpagent({
  //   rejectUnauthorized: false,
  // });
  constructor() {}

  login(username: string, password: string): Observable<any> {
    console.log('Ola do auth service');

    const promise = axios.post(`${this.baseUrl}Login`, { username, password });

    return from(promise);
  }
}
