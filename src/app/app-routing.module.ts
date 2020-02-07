import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavigationComponent} from '@app/layout/components/navigation/navigation.component';
import {Error404Component} from '@app/layout/components/error404/error404.component';

const routes: Routes = [
    {
        path: '',
        component: NavigationComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'appointment'
            },
            {
                path: 'pathNotFound', component: Error404Component
            },
            {
                path: '**', redirectTo: 'pathNotFound'
            }]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
