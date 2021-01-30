import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { UsersService } from '../../../_services/users.service';
import { UserRetorno } from '../../../_models/user_retorno';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  loading = false;
  dados: any;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        emptyTable: "Nenhum registro encontrado",
        info: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        infoEmpty: "Mostrando 0 até 0 de 0 registros",
        infoFiltered: "(Filtrados de _MAX_ registros)",
        infoPostFix: "",
        lengthMenu: "_MENU_ resultados por página",
        loadingRecords: "Carregando...",
        processing: "Processando...",
        zeroRecords: "Nenhum registro encontrado",
        search: "Pesquisar",
        paginate: {
          next: "Próximo",
          previous: "Anterior",
          first: "Primeiro",
          last: "Último"
        },
        aria: {
          sortAscending: ": Ordenar colunas de forma ascendente",
          sortDescending: ": Ordenar colunas de forma descendente"
        }
      }
    };
    this.usersService.getAll().subscribe((
      resposta: UserRetorno) => 
      {this.dados = resposta.data; this.dtTrigger.next();},
      (error) => {console.log(error); }
    );    
  }
  public onDelete(id: any){
    if ( confirm(`Deseja realmente excluir o registro `) ) {
      this.usersService.delete(id)
          .subscribe(
            () => { 
                    alert("Registro excluído com sucesso!");
                    return this.router.navigate(['/usuarios_list']);
                  },
            () => alert("Ocorreu um no servidor, tente mais tarde.")
          )
    }
  }

}
