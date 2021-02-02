import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';

import { UsersService } from '../../../_services/users.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})

export class UsersFormComponent implements OnInit {
  loading = false;
  id: any;
  users: any;
  retorno: any;
  form!: FormGroup;

  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    this.id = this.route.snapshot.paramMap.get('id');
    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', Validators.required),
      password: new FormControl(''),
      confirma_senha: new FormControl('')
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
      this.usersService.update(this.form.value, this.id)
      .subscribe(
        retorno => {
          this.loading = false;
          this.retorno = retorno;
          return this.router.navigate(['/usuarios']);
        },
        error => {
          Swal.fire('Error!', error, 'error')
        }
      )     
    }else{
      this.usersService.create(this.form.value)
      .subscribe(
          retorno => {
          this.loading = false;
          this.retorno = retorno;
          return this.router.navigate(['/usuarios']);
        },
        error => {
          Swal.fire('Error!', error, 'error')
        }
      )  
    }   
  } 

  gotoList() {
    this.router.navigate(['/usuarios']);
  }

  onCarrega(){    
    this.usersService.getByID(this.id).pipe(first()).subscribe(users => {
      this.loading = false;
      this.retorno = users;
      this.users = this.retorno[0];
      this.form.patchValue(
        {
          id: this.users.id, 
          name: this.users.name,
          email: this.users.email
        }
      );
    });
  }

}