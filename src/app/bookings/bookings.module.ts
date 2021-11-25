import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { BookingComponent } from './booking-pages/booking/booking.component';
import { HairstylesComponent } from './booking-pages/hairstyles/hairstyles.component';
import { InformationComponent } from './booking-pages/information/information.component';


@NgModule({
  declarations: [
    BookingComponent,
    HairstylesComponent,
    InformationComponent
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule
  ]
})
export class BookingsModule { }
