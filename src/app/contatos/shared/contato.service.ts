import { AngularFireDatabase } from '@angular/fire/database';
import { Contato } from './contato';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private db: AngularFireDatabase) { }

  insert(contato: Contato) {
    // salvando o contato no firebase
    // importante o nome da list é o nome da collection la no firebase
    this.db.list('contato').push(contato)
      .then((result: any) => { //apenas para exibir o contato salvo no log
        console.log(result.key);
      });

  }

  update(contato: Contato, key: string) {
    this.db.list('contato').update(key, contato)
      .catch((error: any) => { //capturando msg de erro
        console.log(error);
      });
  }

  getAll() {
    return this.db.list('contato')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(data => ({ key: data.payload.key, ...data.payload.val() as {} }));
        })
      );
  }

  delete(key: string) {
    this.db.object(`contato/${key}`).remove();
  }
}
