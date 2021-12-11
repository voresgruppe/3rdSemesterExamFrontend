import {Component, OnInit} from '@angular/core';
import {AppointmentService} from "../../../shared/appointment.service";
import {Appointment} from "../../../shared/appointment.model";
import {CustomerService} from "../../../shared/customer.service";
import {Customer} from "../../../shared/customer.model";
import {FormBuilder} from "@angular/forms";
import {Hairstyle} from "../../../shared/hairstyle.model";
import {HairstyleService} from "../../../shared/hairstyle.service";
import {AuthService} from "../../../shared/auth.service";
import {Employee} from "../../../shared/employee.model";
import {EmployeeService} from "../../../shared/employee.service";


@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss']
})

export class EmployeeHomeComponent implements OnInit {

  $customers: Customer[] | undefined;
  $appointments: Appointment[] | undefined;
  $appointmentsByLoggedEmployee: Appointment[] | undefined;
  $hairstyles: Hairstyle[] | undefined;
  $starterStyles: Hairstyle[] | undefined;
  $employees: Employee[] | undefined;
  $chosenHairstyle: Hairstyle | undefined;
  $loggedEmployee: Employee | undefined;
  $chosenPossibleHairstyle: Hairstyle | undefined;




  $manageAppointments_chosenAppointment: Appointment| undefined;
  $manageAppointments_chosenHairstyle: Hairstyle | undefined;
  $manageAppointments_possibleHairstyles: Hairstyle[] | undefined;



  showing: string | null | undefined;
  appointments= "appointments";
  customers = "customers";
  hairstyles = "hairstyles";
  addCustomer = "addCustomer";
  myAppointments = "myAppointments";

  manageAppointments= "manageAppointments";

  manageAppointments_deleteLabel_text = "Deletes chosen appointment "

  addHairstyle = "addHairstyle";
  manageHairstyle = "manageHairstyle";




  hairstyleForm = this._fb.group({
    name: [''],
    estimatedTime: [''],
    description: [''],
    price:[''],
    /*possibleStyles:[''],*/
    isStarterHairstyle:['']
  });

  customerForm = this._fb.group({
    name: [''],
    phoneNumber: [''],
    email: [''],
  });

  appointmentForm = this._fb.group({
    hairstyleStarterId: [''],
    hairstyleEndId: [''],
    appointmentTime: [''],
    employeeId: [''],
    customerId: [''],
  });





  constructor(private _appointmentService: AppointmentService, private _customerService: CustomerService, private _hairstyleService: HairstyleService,
              private _auth: AuthService, private _employeeService: EmployeeService, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this._appointmentService.getAppointments().subscribe(a => this.$appointments = a as Appointment[]);

    this._customerService.getCustomers().subscribe(a => this.$customers = a as Customer[]);
    this._hairstyleService.getHairstyles().subscribe(h=> this.$hairstyles = h as Hairstyle[])
    this._employeeService.getEmployees().subscribe(e=> this.$employees= e as Employee[])
    this._hairstyleService.getHairStyles_StarterStyles().subscribe(h=> this.$starterStyles = h as Hairstyle[])

    let employeeId = this._auth.getEmployeeID();
    if(employeeId!= 0)
    {
      this._employeeService.getEmployeeById(employeeId).subscribe(e=> this.$loggedEmployee = e);
      this._appointmentService.getAppointmentsByEmployee(employeeId).subscribe(a => this.$appointmentsByLoggedEmployee = a as Appointment[]);
    }


    this.showing = null;
  }
  click_allCustomers() {
    this.showing = this.customers;
  }

  showingAppointments() {

    this.showing = this.appointments;
  }

  getLoggedEmployeeName(){
    let str = "Error";
    if(this.$loggedEmployee?.name){
      str = this.$loggedEmployee.name;
    }
    return str
  }

  getHairstyleNameById(hairstyleId: number){
    let str = "Error";

    if(this.$hairstyles)
      for(let hairstyle of this.$hairstyles){
        if(hairstyle.id == hairstyleId){
          str = hairstyle.name
        }
      }
    return str;
  }


  getCustomerNameById(customerId: number){

    let str = "Error";

    if(this.$customers)
    for(let customer of this.$customers){
      if(customer.id == customerId){
        str = customer.name
      }
    }

    return str
  }


  getEmployeeNameById(employeeId: number){

    let str = "Error";

    if(this.$employees)
      for(let employee of this.$employees){
        if(employee.id == employeeId){
          str = employee.name
        }
      }

    return str
  }

  click_AddCustomer() {
      this.showing = this.addCustomer
  }


  CreateCustomer() {
    const customer = this.customerForm.value as Customer;
    (this._customerService.createCustomer(customer).subscribe(c => this.$customers?.push(c)));
  }

  click_allHairstyles() {
    this.showing = this.hairstyles;
  }

  showingMyAppointments() {
    this.showing = this.myAppointments;
  }

  ManageAppointments() {
    this.showing = this.manageAppointments;
  }

  CreateHairstyle(){
    const hairstyle = this.hairstyleForm.value as Hairstyle;
    console.log(hairstyle);
    (this._hairstyleService.createHairstyle(hairstyle).subscribe(h => this.$hairstyles?.push(h)));
  }

  click_AddHairstyle() {
    this.showing = this.addHairstyle;
  }

  click_manageHairstyles() {
    this.showing = this.manageHairstyle;
  }

  async chooseHairstyle() {
    const e = document.getElementById('hairstyleId') as HTMLSelectElement;
    const id = e.options[e.selectedIndex].value;

    this._hairstyleService.getHairstyle(+id).subscribe(h => this.$chosenHairstyle = h)

    await new Promise(f => setTimeout(f, 300))

  }

  async choosePossibleHairstyle() {
    const e = document.getElementById('possibleHairstyleId') as HTMLSelectElement;
    const id = e.options[e.selectedIndex].value;

    this._hairstyleService.getHairstyle(+id).subscribe(h => this.$chosenPossibleHairstyle = h)

    await new Promise(f => setTimeout(f, 300))
  }

  addToPossibleStyle($chosenPossibleHairstyle: Hairstyle | undefined) {
    if ($chosenPossibleHairstyle){
      this.$chosenHairstyle?.possibleStyles.push($chosenPossibleHairstyle.id);
    }
    if(this.$chosenHairstyle){
      this._hairstyleService.updateHairstyle(this.$chosenHairstyle.id, this.$chosenHairstyle).subscribe(h=>this.$chosenHairstyle = h);
    }
  }


  async chooseAppointment() {
    const e = document.getElementById('manageAppointments_chosenAppointmentId') as HTMLSelectElement;
    const id = e.options[e.selectedIndex].value;

    this._appointmentService.getAppointmentById(+id).subscribe(a => this.$manageAppointments_chosenAppointment = a)

    await new Promise(f => setTimeout(f, 300))
  }

  UpdateAppointment(appointment: Appointment | undefined) {
    const updatedAppointment = this.appointmentForm.value as Appointment;
    if(appointment){
      this._appointmentService.updateAppointment(appointment.id, updatedAppointment).subscribe(a=>this.$manageAppointments_chosenAppointment = a);
    }
  }



  async manageAppointments_chooseStarterStyle() {
    const e = document.getElementById('manageAppointments_hairstyleStarter') as HTMLSelectElement;
    const id = e.options[e.selectedIndex].value;


    this._hairstyleService.getHairstyle(+id).subscribe(h => this.$manageAppointments_chosenHairstyle = h)

    await new Promise(f => setTimeout(f, 300))

    if (this.$manageAppointments_chosenHairstyle) {
      this._hairstyleService.getHairstyleFromListOfId(this.$manageAppointments_chosenHairstyle.possibleStyles).subscribe(h => this.$manageAppointments_possibleHairstyles = h);
    }
  }

  deleteAppointment(appointment: Appointment|undefined) {
    let deleted: boolean = false;
      if(appointment){
        this._appointmentService.deleteAppointment(appointment.id).subscribe(a=> deleted = a);
        deleted = true
      }
      if(deleted){
        console.log(this.manageAppointments_deleteLabel_text)
        this.manageAppointments_deleteLabel_text = "Appointment Deleted, reload page"
        // @ts-ignore
        document.getElementById('manageAppointments_deleteLabel').innerHTML = "Appointment Deleted, reload page";

      }

      return deleted
  }
}
