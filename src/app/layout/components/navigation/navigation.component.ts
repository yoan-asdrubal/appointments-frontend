import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {MenuItemService} from '@app/core/model/menu-item/menu-item.service';
import {MenuItemModel} from '@app/core/model/menu-item/menu-item.model';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    items: Observable<MenuItemModel[]>;
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(private breakpointObserver: BreakpointObserver, private menuS: MenuItemService) {
    }

    ngOnInit() {
        this.items = this.menuS.list();
    }

}
