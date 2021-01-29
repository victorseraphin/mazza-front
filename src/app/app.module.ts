import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './_pages/login/login.component';
import { MenutopComponent } from './_menu/menutop/menutop.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AgendaComponent } from './_pages/agenda/agenda.component';
import { MedicosComponent } from './_pages/medicos/medicos.component';
import { PacientesComponent } from './_pages/pacientes/pacientes.component';
import { UsersComponent } from './_pages/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenutopComponent,
    AgendaComponent,
    MedicosComponent,
    PacientesComponent,
    UsersComponent
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
