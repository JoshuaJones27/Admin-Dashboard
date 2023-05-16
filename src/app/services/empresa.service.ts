import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { from, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private baseUrl = 'https://localhost:7017/api/Companies/';

  constructor(
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  postRegisterCompany(
    name: string,
    connectionName: string,
    connectionPassword: string,
    confirmConnectionPassword: string
  ): Observable<any> {
    console.log('Ola do auth service');
    console.log(this.baseUrl);

    const promise = axios.post(`${this.baseUrl}RegisterCompany`, {
      name,
      connectionName,
      connectionPassword,
      confirmConnectionPassword,
    });

    return from(promise);
  }

  getCompanyID(): Observable<any> {
    const companyId = this.sharedService.getCompanyId();
    if (companyId) {
      const promise = axios.get(
        `${this.baseUrl}GetCompany?companyID=${companyId}`
      );
      return from(promise);
    } else {
      return throwError('Company ID is not defined');
    }
  }

  getInviteToCompany(payload: any): Observable<any> {
    const companyId = this.sharedService.getCompanyId();
    if (companyId) {
      const promise = axios.post(
        `${this.baseUrl}GetInviteToCompany?companyID=${companyId}`,
        payload
      );
      return from(promise);
    } else {
      return throwError('Company ID is not defined');
    }
  }

  getInviteToGroup(payload: any): Observable<any> {
    const companyId = this.sharedService.getCompanyId();
    if (companyId) {
      const promise = axios.post(`${this.baseUrl}InviteGroup`, payload);
      return from(promise);
    } else {
      return throwError('Company ID is not defined');
    }
  }
}
