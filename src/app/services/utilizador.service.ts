import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilizadorService {
  private companiesUrl = 'https://localhost:7017/api/Companies/';

  constructor() {}
}
