import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentContainerComponent } from './component/appointment-container/appointment-container.component';
import { AppointmentDialogComponent } from './component/appointment-dialog/appointment-dialog.component';

@NgModule({
  declarations: [AppointmentContainerComponent, AppointmentDialogComponent],
  imports: [
    CommonModule,
    AppointmentRoutingModule
  ]
})
export class AppointmentModule { }
