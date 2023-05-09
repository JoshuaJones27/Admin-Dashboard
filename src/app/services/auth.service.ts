import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { from, map, Observable, throwError } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:7017/api/Users/';
  private accessToken?: string;
  private refreshToken?: string;

  constructor(private sharedService: SharedService) {}

  login(username: string, password: string): Observable<any> {
    const promise = axios.post(`${this.baseUrl}Login`, { username, password });

    return from(promise).pipe(
      map((response: AxiosResponse) => {
        const data = response.data;
        if (data && data.model && data.model.accessToken) {
          this.accessToken = data.model.accessToken;
          this.refreshToken = data.model.refreshToken;
          const companyId =
            data.model.companiesRoles.length > 0
              ? data.model.companiesRoles[0].companyid
              : undefined;

          console.log('Access Token:', this.accessToken);
          console.log('Refresh Token:', this.refreshToken);
          console.log('Company ID:', companyId);

          this.sharedService.setCompanyId(companyId);
          console.log('Shared Company ID:', this.sharedService.getCompanyId());

          debugger;
        }
        return response;
      })
    );
  }

  get companyId(): string | undefined {
    return this.sharedService.getCompanyId();
  }
}
