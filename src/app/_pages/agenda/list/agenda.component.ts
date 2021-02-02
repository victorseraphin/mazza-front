import { Component, OnInit, ViewChild, forwardRef, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NavigationEnd, Router } from "@angular/router";
import { CalendarOptions, Calendar, EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin  from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as moment from 'moment';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { AgendaService } from '../../../_services/agenda.service';
import { Agenda } from '../../../_models/agenda';
import { AgendaRetorno } from  '../../../_models/agenda_retorno';
import { Paciente } from '../../../_models/paciente';
import { Medico } from '../../../_models/medico';
import { PacientesService } from '../../../_services/pacientes.service';
import { MedicosService } from '../../../_services/medicos.service';

export interface DialogData {
  id: number;
  medicos_id: any;
  pacientes_id: any;
  data: string;
  hora_ini: string;
  hora_fin: string;
}

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  calendarOptions!: CalendarOptions;  
  @ViewChild('fullcalendar')
  calendarComponent!: FullCalendarComponent;  
  calendarEvents: EventInput[] = [];
  calendarApi!: Calendar; 
  initialized = false;
  tela!: any;
  dateStr: [] = [];
  timeStr: [] = [];

 constructor(private agendasService: AgendaService,  public dialog: MatDialog) {
 }

  ngOnInit() {  
    forwardRef(() => Calendar);    
    this.calendarOptions = {
      timeZone: 'UTC',
      locale: 'pt-br',
      plugins: [timeGridPlugin , interactionPlugin],
      initialView: 'timeGridWeek',
      allDaySlot: false,
      slotMinTime: "06:00:00",
      slotMaxTime: "21:00:00",
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this)
    }; 
  }

  ngAfterViewChecked() { 
    this.calendarApi = this.calendarComponent.getApi();  
    if (this.calendarApi && !this.initialized) { 
      this.initialized = true; 
      this.getDadosAgenda(); 
    } 
  } 

  getDadosAgenda(){
    this.agendasService.getAll().subscribe((resposta : AgendaRetorno) => {    
      resposta.forEach( (value: any) => {
        this.calendarEvents.push(value);
        this.calendarApi.removeAllEventSources(); 
        this.calendarApi.addEventSource(this.calendarEvents); 
      });
    });   
}
  
  handleDateClick(arg: any) {    
    this.dateStr = arg.dateStr.substr(0, 10);
    this.timeStr = arg.dateStr.substr(11, 13);
    const dialogRef = this.dialog.open(TelaModal, {      
      data: { 
        data:  moment(this.dateStr, 'YYYY-MM-DD').format('DD/MM/YYYY'), 
        hora_ini:  moment(this.timeStr, 'HH:mm').format('HH:mm'), 
        hora_fin: moment(this.timeStr, 'HH:mm').add(60, 'minutes').format('HH:mm')}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.tela = result;
    });
  }

  handleEventClick(arg: any) {
    this.dateStr = arg.event.startStr.substr(0, 10);
    const dialogRef = this.dialog.open(TelaModal, {      
      data: { 
        id: arg.event.id, 
        pacientes_id: arg.event.extendedProps.pacientes_id, 
        medicos_id:  arg.event.extendedProps.medicos_id, 
        data:  moment(this.dateStr, 'YYYY-MM-DD').format('DD/MM/YYYY'), 
        hora_ini:  moment(arg.event.startStr.substr(11, 13), 'HH:mm').format('HH:mm'),
        hora_fin:  moment(arg.event.endStr.substr(11, 13), 'HH:mm').format('HH:mm')}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.tela = result;
    });
  }


}
@Component({
  selector: 'tela-modal',
  templateUrl: 'tela-modal.html',
})
export class TelaModal {
  id: any;
  form_modal!: FormGroup;
  public pacientes: any; 
  public medicos: any; 

  constructor(
    public dialogRef: MatDialogRef<TelaModal>,
    @Inject(MAT_DIALOG_DATA) public tela: DialogData,
    private router: Router,
    private agendasService: AgendaService,
    private pacientesService: PacientesService,
    private medicosService: MedicosService, ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

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
    this.form_modal = new FormGroup({
      id: new FormControl(''),
      medicos_id: new FormControl('', [Validators.required]),
      pacientes_id: new FormControl('', Validators.required),
      data: new FormControl('', [Validators.required]),
      hora_ini: new FormControl('', [Validators.required]),
      hora_fin: new FormControl('', [Validators.required]),
    }); 
    this.onCarrega();

    this.pacientesService.getAll().subscribe((resposta: Paciente) => {
      this.pacientes = resposta;      
    }, error => console.log(error));

    this.medicosService.getAll().subscribe((resposta: Medico) => {
      this.medicos = resposta;      
    }, error => console.log(error));
    
  }

  get f(){
    return this.form_modal.controls;
  }

  onSubmit() {
    this.dialogRef.close();
    this.id = this.form_modal.value.id;   
    console.log(this.form_modal.value);
    
    this.form_modal.value.data = moment(this.form_modal.value.data).format('YYYY/DD/MM');

    if(this.id != null){
      console.log('update');
      this.agendasService.update(this.form_modal.value, this.id).subscribe(retorno => {
        return this.router.navigate(['/agendas']);
      })    
    }else{  
      console.log('create');          
      this.agendasService.create(this.form_modal.value).subscribe(retorno => {        
        return this.router.navigate(['/agendas']);
      })  
    }
    
  } 
  onCarrega(){         
      this.form_modal.patchValue(
        {
          id: this.tela.id, 
          medicos_id: (typeof this.tela.medicos_id !== 'undefined') ? this.tela.medicos_id: null,
          pacientes_id: (typeof this.tela.pacientes_id !== 'undefined') ? this.tela.pacientes_id: null,
          data: this.tela.data,
          hora_ini: this.tela.hora_ini,
          hora_fin: this.tela.hora_fin,
        }
      );
  }
  public onDelete(id: any){
    if ( confirm(`Deseja realmente excluir o registro `) ) {
      this.agendasService.delete(id)
          .subscribe(
            () => { 
                    alert("Registro excluído com sucesso!");
                    return this.router.navigate(['/agendas']); 
                  },
            () => alert("Ocorreu um no servidor, tente mais tarde.")
          )
    }
  }

}
