import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {ReactiveFormsModule} from '@angular/forms';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {DirectivesModule} from '@app/shared/directives/directives.module';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgxMaterialTimepickerModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    DirectivesModule
  ],
  exports: [
    ReactiveFormsModule,
    RxReactiveFormsModule,
    CalendarModule,
    NgxMaterialTimepickerModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    DirectivesModule
  ]
})
export class SharedModule {
}
