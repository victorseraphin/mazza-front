import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './_pages/auth/login/login.component';
import { MenutopComponent } from './_menu/menutop/menutop.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AgendaComponent } from './_pages/agenda/list/agenda.component';
import { MedicosComponent } from './_pages/medicos/list/medicos.component';
import { MedicosFormComponent } from './_pages/medicos/form/medicos-form.component';
import { PacientesComponent } from './_pages/pacientes/list/pacientes.component';
import { PacientesFormComponent } from './_pages/pacientes/form/pacientes-form.component';
import { UsersComponent } from './_pages/users/list/users.component';
import { UsersFormComponent } from './_pages/users/form/users-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenutopComponent,
    AgendaComponent,
    MedicosComponent,
    MedicosFormComponent,
    PacientesComponent,
    PacientesFormComponent,
    UsersComponent,
    UsersFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
