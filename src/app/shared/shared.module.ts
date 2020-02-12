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
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        DirectivesModule
    ],
    exports: [
        ReactiveFormsModule,
        RxReactiveFormsModule,
        CalendarModule,
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        DirectivesModule
    ]
})
export class SharedModule {
}
