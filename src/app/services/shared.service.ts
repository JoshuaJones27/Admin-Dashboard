import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private companyId: string | null;
  private userType: number | null = null;

  constructor() {
    this.companyId = sessionStorage.getItem('companyId') || null;
    const userTypeString = sessionStorage.getItem('userType');
    if (userTypeString) {
      this.userType = parseInt(userTypeString, 10);
    }
  }

  setCompanyId(id: string) {
    this.companyId = id;
    // salva o companyId no localStorage
    sessionStorage.setItem('companyId', id);
  }

  getCompanyId(): string | undefined {
    return this.companyId !== null ? this.companyId : undefined;
  }

  // setUserType(userType: number) {
  //   this.userType = userType;
  //   sessionStorage.setItem('userType', userType.toString());
  // }

  setUserType(userType: number | undefined) {
    this.userType = userType !== undefined ? userType : null;
    if (userType !== undefined) {
      sessionStorage.setItem('userType', userType.toString());
    } else {
      sessionStorage.removeItem('userType');
    }
  }

  getUserType(): number | undefined {
    console.log('Retrieved User Type:', this.userType);

    return this.userType !== null ? this.userType : undefined;
  }
}
