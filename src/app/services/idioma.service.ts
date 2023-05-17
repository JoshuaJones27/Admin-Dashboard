import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdiomaService {
  constructor() {}

  private currentIdioma: string = 'pt';
  private idiomaChangeSubject: Subject<string> = new Subject<string>();

  getIdioma(): string {
    return this.currentIdioma;
  }

  setIdioma(idioma: string): void {
    this.currentIdioma = idioma;
    this.idiomaChangeSubject.next(idioma);
  }

  onIdiomaChange(): Observable<string> {
    return this.idiomaChangeSubject.asObservable();
  }
}
