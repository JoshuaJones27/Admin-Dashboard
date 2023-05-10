import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private baseUrl = 'https://localhost:7017/api/Requests/';

  constructor() {}

  postPedidos(requestName: string, requestMethod: string): Observable<any> {
    console.log('Ola do auth service');
    console.log(this.baseUrl);

    const promise = axios.post(`${this.baseUrl}CreateRequest`, {
      requestName,
      requestMethod,
    });

    return from(promise);
  }

  getPedidos(): Observable<any> {
    const promise = axios.get(`${this.baseUrl}GetRequest`);
    return from(promise);
  }
}
