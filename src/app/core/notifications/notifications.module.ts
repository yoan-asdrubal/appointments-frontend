import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationsService} from './domain/notifications.service';
import {AlertAreaComponent} from './components/alert-area/alert-area.component';
import {AlertComponent} from './components/alert/alert.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [AlertComponent, AlertAreaComponent],
    exports: [AlertAreaComponent],
    providers: [NotificationsService]
})
export class NotificationsModule {
}
