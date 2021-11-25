import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { BookingsRoutingModule } from './bookings-routing.module';
import { BookingComponent } from './booking-pages/booking/booking.component';
import { HairstylesComponent } from './booking-pages/hairstyles/hairstyles.component';
import { InformationComponent } from './booking-pages/information/information.component';
import { CalendarComponent } from './calendar/calendar.component';


@NgModule({
  declarations: [
    BookingComponent,
    HairstylesComponent,
    InformationComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    HttpClientModule
  ]
})
export class BookingsModule { }
