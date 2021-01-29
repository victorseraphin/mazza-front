import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './_pages/login/login.component';
import { AgendaComponent } from './_pages/agenda/agenda.component';
import { MedicosComponent } from './_pages/medicos/medicos.component';
import { PacientesComponent } from './_pages/pacientes/pacientes.component';
import { UsersComponent } from './_pages/users/users.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: '', component: AgendaComponent, canActivate: [AuthGuard]},
  { path: 'agenda', component: AgendaComponent, canActivate: [AuthGuard]},
  { path: 'medicos', component: MedicosComponent, canActivate: [AuthGuard]},
  { path: 'pacientes', component: PacientesComponent, canActivate: [AuthGuard]},
  { path: 'usuarios', component: UsersComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },

  // otherwise redirect to produtos
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
