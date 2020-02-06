import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {Alert, AlertType} from '../../domain/notifications.model';

@Component({
    selector: 'alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    animations: [
        trigger('alert', [
            transition('void => *', [
                style({transform: 'scale3d(.3, .3, .3)'}),
                animate(400)
            ]),
            transition('* => void', [
                animate(300, style({transform: 'scale3d(.0, .0, .0)'}))
            ])
        ])
    ]
})
export class AlertComponent implements OnInit {

    @Input() alert: Alert;
    @Output() close: EventEmitter<boolean> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    alertClass(): string {
        return ALERT_CLASS_TRANSLATOR[this.alert && this.alert.type] || '';
    }
}

const ALERT_CLASS_TRANSLATOR = {
    [AlertType.DANGER]: 'danger',
    [AlertType.INFO]: 'info',
    [AlertType.SUCCESS]: 'success',
    [AlertType.WARNING]: 'warning',
};
