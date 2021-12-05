import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "./employee.model";
import {environment} from "../../environments/environment";
import {Appointment} from "./appointment.model";
import {Injectable} from "@angular/core";
import {Customer} from "./customer.model";


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private _http: HttpClient) { }

  getAppointments(): Observable<Appointment[]>{
    return this._http.get<Appointment[]>(`${environment.api}/Appointment`)
  }

  getAppointmentsByEmployee(id: number):Observable<Appointment[]> {
    return this._http.get<Appointment[]>(`${environment.api}/Appointment/GetByEmployee${id}`)
  }

  createAppointment(appointment: Appointment): Observable<Appointment>{
    return this._http.post<Appointment>(`${environment.api}/Appointment/CreateAppointment`, appointment)
  }
}
