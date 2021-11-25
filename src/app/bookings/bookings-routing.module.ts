import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking-pages/booking/booking.component';
import { HairstylesComponent } from './booking-pages/hairstyles/hairstyles.component';
import { InformationComponent } from './booking-pages/information/information.component';

const routes: Routes = [
  { path: 'booking', component: BookingComponent },
  { path: 'hairstyles', component: HairstylesComponent },
  { path: 'information', component: InformationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule { }
