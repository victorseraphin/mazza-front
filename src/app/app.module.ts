import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { CommonModule } from '@angular/common';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './_pages/auth/login/login.component';
import { MenutopComponent } from './_menu/menutop/menutop.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AgendaComponent } from './_pages/agenda/list/agenda.component';
import { TelaModal } from './_pages/agenda/list/agenda.component';
import { MedicosComponent } from './_pages/medicos/list/medicos.component';
import { MedicosFormComponent } from './_pages/medicos/form/medicos-form.component';
import { PacientesComponent } from './_pages/pacientes/list/pacientes.component';
import { PacientesFormComponent } from './_pages/pacientes/form/pacientes-form.component';
import { UsersComponent } from './_pages/users/list/users.component';
import { UsersFormComponent } from './_pages/users/form/users-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenutopComponent,
    AgendaComponent,
    TelaModal,
    MedicosComponent,
    MedicosFormComponent,
    PacientesComponent,
    PacientesFormComponent,
    UsersComponent,
    UsersFormComponent
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    NgOptionHighlightModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    FullCalendarModule,
    NoopAnimationsModule, 
    MatDialogModule,
    MatInputModule
    
    
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
