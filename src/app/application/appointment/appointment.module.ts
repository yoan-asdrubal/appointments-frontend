import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentContainerComponent } from './component/appointment-container/appointment-container.component';

@NgModule({
  declarations: [AppointmentContainerComponent],
  imports: [
    CommonModule,
    AppointmentRoutingModule
  ]
})
export class AppointmentModule { }
