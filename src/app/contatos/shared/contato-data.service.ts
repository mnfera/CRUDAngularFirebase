import { Contato } from './contato';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoDataService {
  private contatoSource = new BehaviorSubject({ contato: null, key: '' });
  currentContato = this.contatoSource.asObservable();

  constructor() { }

  changeContato(contato: Contato, key: string) {
    this.contatoSource.next({ contato: contato, key: key });
  }
}
