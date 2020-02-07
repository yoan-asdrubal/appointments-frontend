import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {NavigationComponent} from './components/navigation/navigation.component';
import {LayoutModule} from '@angular/cdk/layout';
import {Error404Component} from '@app/layout/components/error404/error404.component';

@NgModule({
    declarations: [NavigationComponent, Error404Component],
    exports: [NavigationComponent, Error404Component],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        LayoutModule
    ]
})
export class AppLayoutModule {
}
