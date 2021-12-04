import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "./employee.model";
import {environment} from "../../environments/environment";
import {Appointment} from "./appointment.model";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private _http: HttpClient) { }

  getAppointments(): Observable<Appointment[]>{
    return this._http.get<Appointment[]>(`${environment.api}/Appointment`)
  }
}
