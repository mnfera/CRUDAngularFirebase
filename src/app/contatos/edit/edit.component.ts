import { ContatoDataService } from './../shared/contato-data.service';
import { ContatoService } from './../shared/contato.service';
import { Contato } from './../shared/contato';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  contato: Contato;
  key: string = '';

  constructor(private contatoService: ContatoService, private contatoDataService: ContatoDataService) { }

  ngOnInit(): void {
    this.contato = new Contato();
    this.contatoDataService.currentContato.subscribe(data => {
      if (data.contato && data.key) { // se for para editar eles tem valores
        this.contato = new Contato();
        this.contato.nome = data.contato.nome;
        this.contato.telefone = data.contato.telefone;
        this.key = data.key;
      }
    });
  }

  onSubmit() {
    if (this.key) { // se existir a chave é pq tá editando
      this.contatoService.update(this.contato, this.key);
    } else { // senão será um novo contato
      this.contatoService.insert(this.contato);
    }

    this.contato = new Contato();
    this.key = null;

  }

}
