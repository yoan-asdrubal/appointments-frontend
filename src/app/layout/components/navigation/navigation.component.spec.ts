import {LayoutModule} from '@angular/cdk/layout';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';

import {NavigationComponent} from './navigation.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DatasourceService} from '@app/core/datasource/domain/datasource.service';
import {MenuItemService} from '@app/core/model/menu-item/menu-item.service';
import {MenuItemQuery} from '@app/core/model/menu-item/menu-item-query.service';
import {MenuItemStore} from '@app/core/model/menu-item/menu-item-store.service';
import {of} from 'rxjs';
import {createMenuItem} from '@app/core/model/menu-item/menu-item.model';

const items = [
    createMenuItem({
        'id': 1,
        'label': 'Appointments',
        'route': '/appointment',
        'cy': 'appointment-route'
    }),
    createMenuItem({
        'id': 2,
        'label': 'Logs',
        'route': '/logs',
        'cy': 'log-route'
    })
];
describe('NavigationComponent', () => {
    let component: NavigationComponent;
    let fixture: ComponentFixture<NavigationComponent>;
    let datasourceService;
    beforeEach(async(() => {
        datasourceService = {
            request: jest.fn()
        };
        datasourceService.request = jest.fn(() => {
            return of(items);
        });

        TestBed.configureTestingModule({
            declarations: [NavigationComponent],
            imports: [
                NoopAnimationsModule,
                RouterTestingModule,
                HttpClientTestingModule,
                LayoutModule,
                MatButtonModule,
                MatIconModule,
                MatListModule,
                MatSidenavModule,
                MatToolbarModule,
            ],
            providers: [
                MenuItemQuery,
                MenuItemStore,
                MenuItemService,
                {
                    provide: DatasourceService, useValue: datasourceService
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should compile', () => {
        expect(component).toBeTruthy();

    });

    it('should show menu items', function() {
        expect(fixture.nativeElement.querySelectorAll('.mat-list-item').length).toEqual(2);
        items.forEach((item) => {
            expect(fixture.nativeElement.querySelector(`[data-cy='${item.cy}']`)).toBeTruthy();
        });
    });
});
