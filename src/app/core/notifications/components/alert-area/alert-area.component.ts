

import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationsService} from '../../domain/notifications.service';
import {Alert} from '../../domain/notifications.model';
import {Observable} from 'rxjs';

@Component({
	selector: 'alert-area',
	templateUrl: './alert-area.component.html',
	styleUrls: ['./alert-area.component.scss']
})
export class AlertAreaComponent implements OnInit, OnDestroy {

	alerts: Observable<Alert[]> = this._service.getAlertAsObservable();

	constructor(private _service: NotificationsService) {
	}

	ngOnInit() {
	}

	ngOnDestroy(): void {
	}

	doClose(alert: Alert) {
		this._service.doClose(alert);
	}
}
