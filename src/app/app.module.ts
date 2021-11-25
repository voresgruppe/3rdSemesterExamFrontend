import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about-page/about/about.component';

import { AppComponent } from './app.component';
import { BookingComponent } from './bookings/booking-pages/booking/booking.component';
import { HairstylesComponent } from './bookings/booking-pages/hairstyles/hairstyles.component';
import { InformationComponent } from './bookings/booking-pages/information/information.component';
import { ContactComponent } from './contact/contact-page/contact/contact.component';
import { HomeComponent } from './home/home-page/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'hairstyles', component: HairstylesComponent },
  { path: 'information', component: InformationComponent }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
