import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private companyId: string | null;

  constructor() {
    // recupera o companyId do localStorage, se existir
    this.companyId = localStorage.getItem('companyId') || null;
  }

  setCompanyId(id: string) {
    this.companyId = id;
    // salva o companyId no localStorage
    localStorage.setItem('companyId', id);
  }

  getCompanyId(): string | undefined {
    return this.companyId !== null ? this.companyId : undefined;
  }
}
