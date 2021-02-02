import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './_pages/auth/login/login.component';
import { AgendaComponent } from './_pages/agenda/list/agenda.component';
import { MedicosComponent } from './_pages/medicos/list/medicos.component';
import { MedicosFormComponent } from './_pages/medicos/form/medicos-form.component';
import { PacientesComponent } from './_pages/pacientes/list/pacientes.component';
import { PacientesFormComponent } from './_pages/pacientes/form/pacientes-form.component';
import { UsersComponent } from './_pages/users/list/users.component';
import { UsersFormComponent } from './_pages/users/form/users-form.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: '', component: AgendaComponent, canActivate: [AuthGuard]},
  { path: 'agenda', component: AgendaComponent, canActivate: [AuthGuard]},
  { path: 'agenda/:id', component: AgendaComponent, canActivate: [AuthGuard] },
  { path: 'agenda_create', component: AgendaComponent, canActivate: [AuthGuard] },
  { path: 'agenda_edit/:id', component: AgendaComponent, canActivate: [AuthGuard] },

  { path: 'medicos', component: MedicosComponent, canActivate: [AuthGuard]},
  { path: 'medicos_create', component: MedicosFormComponent, canActivate: [AuthGuard] },
  { path: 'medicos_edit/:id', component: MedicosFormComponent, canActivate: [AuthGuard] },

  { path: 'pacientes', component: PacientesComponent, canActivate: [AuthGuard]},
  { path: 'pacientes_create', component: PacientesFormComponent, canActivate: [AuthGuard] },
  { path: 'pacientes_edit/:id', component: PacientesFormComponent, canActivate: [AuthGuard] },

  { path: 'usuarios', component: UsersComponent, canActivate: [AuthGuard]},
  { path: 'usuarios_create', component: UsersFormComponent, canActivate: [AuthGuard] },
  { path: 'usuarios_edit/:id', component: UsersFormComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },

  // otherwise redirect to produtos
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
