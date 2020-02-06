import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {environment} from '../environments/environment';
import {DatasourceModule} from './core/datasource/datasource.module';
import {DATASOURCE_CONFIG} from './core/datasource/datasource.url.config';
import {NotificationsModule} from '@app/core/notifications/notifications.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        DatasourceModule.forRoot(DATASOURCE_CONFIG),
        NotificationsModule,
        environment.production ? [] : AkitaNgDevtools.forRoot(),
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
