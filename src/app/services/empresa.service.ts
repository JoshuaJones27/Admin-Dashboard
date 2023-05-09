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

  getCompanyApplications(): Observable<any> {
    const companyId = this.sharedService.getCompanyId();
    if (companyId) {
      const promise = axios.get(
        `${this.baseUrl}GetCompanyApplications?companyID=${companyId}`
      );
      return from(promise);
    } else {
      return throwError('Company ID is not defined');
    }
  }

  getCompanyDetails(): Observable<any> {
    const companyId = this.sharedService.getCompanyId();
    if (companyId) {
      const promise = axios.get(
        `${this.baseUrl}GetCompany?companyID=${companyId}`
      );
      const applicationsPromise = axios.get(
        `${this.baseUrl}GetCompanyApplications?companyID=${companyId}`
      );
      const usersPromise = axios.get(
        `${this.baseUrl}GetAssociatedUsers?companyID=${companyId}`
      );

      return from(
        Promise.all([promise, applicationsPromise, usersPromise])
      ).pipe(
        map((responses: AxiosResponse[]) => {
          const companyData = responses[0].data;
          const applicationsData = responses[1].data;
          const usersData = responses[2].data;

          const applications = applicationsData.map((application: any) => ({
            applicationId: application.applicationID,
            usersCompany: application.UsersCompany.map((userCompany: any) => ({
              internalID: userCompany.InternalID,
              internalFullName: userCompany.InternalFullName,
              internalEmail: userCompany.InternalEmail,
            })),
          }));

          const users = usersData.responseData.map((user: any) => ({
            telegramName: user.usertelegram.telegramName,
            telegramUsername: user.usertelegram.telegramUsername,
            companiesRoles: user.companiesRoles.map((role: any) => ({
              roleID: role.roleid,
              roleName: role.rolename,
            })),
          }));

          return {
            companyId: companyData._id,
            name: companyData.Name,
            connectionName: companyData.ConnectionName,
            connectionPassword: companyData.ConnectionPassword,
            applications,
            users,
          };
        })
      );
    } else {
      return throwError('Company ID is not defined');
    }
  }

  getAssociatedUsers(companyID: string): Observable<any> {
    const promise = axios.get(
      `${this.baseUrl}GetAssociatedUsers?companyID=${companyID}`
    );
    return from(promise);
  }
}
