import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {AppointmentService} from "../../shared/appointment.service";
import {Appointment} from "../../shared/appointment.model";


@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})

export class EmployeeHomeComponent implements OnInit {


  $appointments: Observable<Appointment[]> | undefined
  showing: string | null | undefined;
  appointment= "appointment";

  constructor(private _service: AppointmentService) { }

  ngOnInit(): void {
    this.$appointments = this._service.getAppointments()
  }
  allCustomers() {

  }

  showingAppointments() {
    this.showing = this.appointment;
  }
}
