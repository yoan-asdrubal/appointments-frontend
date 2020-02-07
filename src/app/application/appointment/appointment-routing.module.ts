import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppointmentContainerComponent} from '@app/application/appointment/component/appointment-container/appointment-container.component';

const routes: Routes = [{
    path: '**',
    pathMatch: 'full',
    component: AppointmentContainerComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppointmentRoutingModule {
}
