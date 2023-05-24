// import { Injectable } from '@angular/core';
// import axios, { AxiosResponse } from 'axios';
// import { from, map, Observable, throwError } from 'rxjs';
// import { SharedService } from './shared.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private baseUrl = 'https://localhost:7017/api/Users/';
//   private accessToken?: string;
//   private refreshToken?: string;

//   constructor(private sharedService: SharedService) {}

//   login(username: string, password: string): Observable<any> {
//     const promise = axios.post(`${this.baseUrl}Login`, { username, password });

//     return from(promise).pipe(
//       map((response: AxiosResponse) => {
//         const data = response.data;
//         if (data && data.model && data.model.accessToken) {
//           this.accessToken = data.model.accessToken;
//           this.refreshToken = data.model.refreshToken;
//           const companyId =
//             data.model.companiesRoles.length > 0
//               ? data.model.companiesRoles[0].companyid
//               : undefined;

//           const userType = Number(data.model.usertype);

//           if (!isNaN(userType)) {
//             console.log('Access Token:', this.accessToken);
//             console.log('Refresh Token:', this.refreshToken);
//             console.log('Company ID:', companyId);
//             console.log('User Type:', userType);

//             this.sharedService.setCompanyId(companyId);
//             this.sharedService.setUserType(userType);
//             console.log(
//               'Shared Company ID:',
//               this.sharedService.getCompanyId()
//             );
//           } else {
//             console.log('Invalid user type:', data.model.usertype);
//           }

//           // console.log('Access Token:', this.accessToken);
//           // console.log('Refresh Token:', this.refreshToken);
//           // console.log('Company ID:', companyId);
//           // console.log('User Type:', userType);

//           // this.sharedService.setCompanyId(companyId);
//           // console.log('Shared Company ID:', this.sharedService.getCompanyId());

//           console.log('Access Token:', this.accessToken);
//           console.log('Refresh Token:', this.refreshToken);
//           console.log('Company ID:', companyId);
//           console.log('User Type:', userType);

//           this.sharedService.setCompanyId(companyId);
//           this.sharedService.setUserType(userType);
//           console.log('Shared Company ID:', this.sharedService.getCompanyId());

//           debugger;
//         }
//         return response;
//       })
//     );
//   }

//   get companyId(): string | undefined {
//     return this.sharedService.getCompanyId();
//   }
// }

import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { catchError, from, map, Observable, of } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:7017/api/Users/';
  private accessToken: string = '';
  private refreshToken?: string;

  constructor(private sharedService: SharedService) {}

  // login(username: string, password: string): Observable<any> {
  //   const promise = axios.post(`${this.baseUrl}Login`, { username, password });

  //   return from(promise).pipe(
  //     map((response: AxiosResponse) => {
  //       const data = response.data;
  //       if (data && data.model && data.model.accessToken) {
  //         this.accessToken = data.model.accessToken;
  //         this.refreshToken = data.model.refreshToken;
  //         const companyId =
  //           data.model.companiesRoles.length > 0
  //             ? data.model.companiesRoles[0].companyid
  //             : undefined;

  //         console.log('Access Token:', this.accessToken);
  //         console.log('Refresh Token:', this.refreshToken);
  //         console.log('Company ID:', companyId);

  //         this.sharedService.setCompanyId(companyId);
  //         this.sharedService.setAccessToken(this.accessToken);

  //         debugger;
  //       }
  //       return response;
  //     })
  //   );
  // }

  isAuthenticated(): Observable<boolean> {
    if (this.accessToken /*&& !this.isAccessTokenExpired()*/) {
      return of(true);
    } else {
      // Access token is not available or expired, attempt to refresh
      return this.refreshAccessToken().pipe(
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
            this.sharedService.setAccessToken(this.accessToken);

            return true;
          } else {
            // Refresh failed or no valid tokens received
            return false;
          }
        }),
        catchError(() => of(false)) // Error occurred during token refresh
      );
    }
  }

  refreshAccessToken(): Observable<any> {
    const promise = axios.post(`${this.baseUrl}RefreshToken`, {
      refreshToken: this.refreshToken,
    });
    return from(promise);
  }

  // isAccessTokenExpired(): boolean {
  //   // Implement the logic to check if the access token is expired
  //   // Return true if expired, false otherwise
  //   // For example:
  //   const expirationDate = ...; // Get the expiration date of the access token
  //   return expirationDate < new Date();
  // }

  login(username: string, password: string): Observable<boolean> {
    // Make API call for authentication using username and password
    const promise = axios.post(`${this.baseUrl}Login`, {
      username: username,
      password: password,
    });
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
          debugger;

          this.sharedService.setCompanyId(companyId);
          this.sharedService.setAccessToken(this.accessToken);

          return true;
        } else {
          // Authentication failed or no valid tokens received
          return false;
        }
      }),
      catchError(() => of(false)) // Error occurred during login
    );
  }

  get companyId(): string | undefined {
    return this.sharedService.getCompanyId();
  }
}
