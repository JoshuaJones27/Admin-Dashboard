import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TradutorService {
  constructor() {}
  private language: string = 'pt'; // Default language

  private translations: any = {
    pt: {
      'button.empresa': 'Empresa',
      'button.idioma': 'Idioma',
      'button.utilizador': 'Utilizador',
      'menu.option1': 'Opção 1',
      'menu.option2': 'Opção 2',
      'menu.option3': 'Opção 3',
      'menu.portuguese': 'Português',
      'menu.english': 'Inglês',
      'menu.changePassword': 'Mudar Palavra Passe',
      'menu.logout': 'Logout',
    },
    en: {
      'button.empresa': 'Company',
      'button.idioma': 'Language',
      'button.utilizador': 'User',
      'menu.option1': 'Option 1',
      'menu.option2': 'Option 2',
      'menu.option3': 'Option 3',
      'menu.portuguese': 'Portuguese',
      'menu.english': 'English',
      'menu.changePassword': 'Change Password',
      'menu.logout': 'Logout',
    },
  };

  translate(key: string): string {
    const translation = this.translations[this.language][key];
    return translation || key;
  }

  getLanguage(): string {
    return this.language;
  }

  setLanguage(language: string): void {
    this.language = language;
  }
}
