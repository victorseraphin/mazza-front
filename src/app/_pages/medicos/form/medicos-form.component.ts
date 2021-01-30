import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from "@angular/router";

import { MedicosService } from '../../../_services/medicos.service';

@Component({
  selector: 'app-medicos-form',
  templateUrl: './medicos-form.component.html',
  styleUrls: ['./medicos-form.component.scss']
})

export class MedicosFormComponent implements OnInit {
  loading = false;
  id: any;
  medicos: any;
  retorno: any;
  form!: FormGroup;

  constructor(private medicosService: MedicosService, private router: Router, private route: ActivatedRoute) { }

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
      this.medicosService.update(this.form.value, this.id).subscribe(retorno => {
        this.loading = false;
        this.retorno = retorno;
        return this.router.navigate(['/medicos']);
      })    
    }else{
      this.medicosService.create(this.form.value).subscribe(retorno => {
        this.loading = false;
        this.retorno = retorno;
        return this.router.navigate(['/medicos_edit/',this.retorno.data.id]);
      })  
    }
  } 

  gotoList() {
    this.router.navigate(['/medicos']);
  }

  onCarrega(){    
    this.medicosService.getByID(this.id).pipe(first()).subscribe(medicos => {
      this.loading = false;
      this.retorno = medicos.data;
      this.medicos = this.retorno[0];
      this.form.patchValue(
        {
          id: this.medicos.id, 
          nome: this.medicos.nome,
          email: this.medicos.email,
          cpf_cnpj: this.medicos.cpf_cnpj,
          telefone1: this.medicos.telefone1,
          telefone2: this.medicos.telefone2,
          cep: this.medicos.cep,
          endereco: this.medicos.endereco,
          numero: this.medicos.numero,
        }
      );
    });
  }

}