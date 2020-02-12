import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppointmentRoutingModule} from './appointment-routing.module';
import {AppointmentContainerComponent} from './component/appointment-container/appointment-container.component';
import {AppointmentDialogComponent} from './component/appointment-dialog/appointment-dialog.component';
import {SharedModule} from '@app/shared/shared.module';
import {ShContextMenuModule} from 'ng2-right-click-menu';
@NgModule({
    declarations: [AppointmentContainerComponent, AppointmentDialogComponent],
    imports: [
        CommonModule,
        AppointmentRoutingModule,
        ShContextMenuModule,
        SharedModule
    ]
})
export class AppointmentModule {
}
