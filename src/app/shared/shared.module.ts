import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {ReactiveFormsModule} from '@angular/forms';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {MatButtonModule} from '@angular/material/button';

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
        MatButtonModule
    ],
    exports: [
        ReactiveFormsModule,
        RxReactiveFormsModule,
        CalendarModule,
        MatButtonModule
    ]
})
export class SharedModule {
}
