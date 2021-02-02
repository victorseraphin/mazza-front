import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';

import { PacientesService } from '../../../_services/pacientes.service';

@Component({
  selector: 'app-pacientes-form',
  templateUrl: './pacientes-form.component.html',
  styleUrls: ['./pacientes-form.component.scss']
})

export class PacientesFormComponent implements OnInit {
  loading = false;
  id: any;
  pacientes: any;
  retorno: any;
  form!: FormGroup;

  constructor(private pacientesService: PacientesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    this.id = this.route.snapshot.paramMap.get('id');
    this.form = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', Validators.required),
      cpf_cnpj: new FormControl('', [Validators.required]),
      telefone1: new FormControl('', [Validators.required]),
      telefone2: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required]),
      endereco: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
    });
    console.log(this.id);
    if(this.id != null){
      this.onCarrega();
    }
  }
  get f(){
    return this.form.controls;
  }
  onSubmit() {
    this.loading = true;
    if(this.id != null){
      this.pacientesService.update(this.form.value, this.id)
      .subscribe(
        retorno => {
          this.loading = false;
          this.retorno = retorno;
          return this.router.navigate(['/pacientes']);
        },
        error => {
          Swal.fire('Error!', error, 'error')
        }
      )   
    }else{
      this.pacientesService.create(this.form.value)
      .subscribe(
        retorno => {
          this.loading = false;
          this.retorno = retorno;
          return this.router.navigate(['/pacientes']);
        },
        error => {
          Swal.fire('Error!', error, 'error')
        }
      )  
    }
  } 

  gotoList() {
    this.router.navigate(['/pacientes']);
  }

  onCarrega(){    
    this.pacientesService.getByID(this.id).pipe(first()).subscribe(pacientes => {
      this.loading = false;      
      this.retorno = pacientes;
      this.pacientes = this.retorno[0];
      console.log(this.pacientes);
      this.form.patchValue(
        {
          id: this.pacientes.id, 
          nome: this.pacientes.nome,
          email: this.pacientes.email,
          cpf_cnpj: this.pacientes.cpf_cnpj,
          telefone1: this.pacientes.telefone1,
          telefone2: this.pacientes.telefone2,
          cep: this.pacientes.cep,
          endereco: this.pacientes.endereco,
          numero: this.pacientes.numero,
        }
      );
    });
  }

}