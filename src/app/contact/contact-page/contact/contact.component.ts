import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../../shared/employee.service";
import {Employee} from "../../../shared/employee.model";
import {observable} from "rxjs";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  $employees: Employee[] | undefined;

  shouldShowEmployees: boolean = false;

  constructor(private _employeeService: EmployeeService) { }

  ngOnInit(): void {
    this._employeeService.getEmployees().subscribe(e=> this.$employees = e);
  }

  contactInfo() :void {
    this.shouldShowEmployees = false
  }

  ourEmployees():void{
    this.shouldShowEmployees = true
  }

}
