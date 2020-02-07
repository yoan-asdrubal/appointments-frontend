import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationService} from './domain/notification.service';
import {AlertAreaComponent} from './components/alert-area/alert-area.component';
import {AlertComponent} from './components/alert/alert.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [AlertComponent, AlertAreaComponent],
    exports: [AlertAreaComponent],
    providers: [NotificationService]
})
export class NotificationsModule {
}
