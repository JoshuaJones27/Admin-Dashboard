import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private baseUrl = 'https://localhost:7017/api/Companies/';

  constructor() {}

  post(
    name: string,
    connectionName: string,
    connectionPassword: string,
    confirmConnectionPassword: string
  ): Observable<any> {
    console.log('Ola do auth service');

    const promise = axios.post(`${this.baseUrl}RegisterCompany`, {
      name,
      connectionName,
      connectionPassword,
      confirmConnectionPassword,
    });

    return from(promise);
  }
}
