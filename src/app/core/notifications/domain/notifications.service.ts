import {Injectable} from '@angular/core';
import {Alert, AlertType} from './notifications.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class NotificationsService {
    $alerts: BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>([]);
    alerts: Alert[] = [];

    constructor() {
    }

    getAlertAsObservable() {
        return this.$alerts.asObservable();
    }

    show(alert: Alert) {
        switch (alert.type) {
            case AlertType.DANGER: {
                this.showError(alert);
                return;
            }
            default: {
                this.showDefault(alert);
                return;
            }
        }
    }

    showError(alert: Alert) {
        this.push(alert);
    }

    showDefault(alert: Alert) {
        this.push(alert);
    }


    /**
     *
     */
    push(alert: Alert) {
        this.alerts.push(alert);

        this.$alerts.next(this.alerts);
        this._createExpirationCall(alert);
    }

    doClose(alert: Alert) {
        const idx = this.alerts.indexOf(alert);
        if (idx >= 0) {
            this.alerts.splice(idx, 1);
            this.$alerts.next(this.alerts);
        }
    }

    private _createExpirationCall(alert: Alert) {
        setTimeout(() => {
            this.doClose(alert);
        }, 5000);
    }
}
