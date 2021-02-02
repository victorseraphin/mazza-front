import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { PacientesService } from '../../../_services/pacientes.service';
import { Paciente } from '../../../_models/paciente';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  loading = false;
  dados: any;

  constructor(private pacientesService: PacientesService, private router: Router) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    };
    
    this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
            this.router.navigated = false;
            window.scrollTo(0, 0);
        }
    });
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
    this.pacientesService.getAll().subscribe((
      resposta: Paciente) => {this.dados = resposta; this.dtTrigger.next();
       },
      (error) => {console.log(error); }
    );
  }
  public onDelete(id: any){
    if ( confirm(`Deseja realmente excluir o registro `) ) {
      this.pacientesService.delete(id)
          .subscribe(
            () => { 
                    alert("Registro excluído com sucesso!");
                    return this.router.navigate(['/pacientes']);
                  },
            () => alert("Ocorreu um no servidor, tente mais tarde.")
          )
    }
  }

}
