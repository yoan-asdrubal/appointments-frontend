import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RxReactiveFormsModule
    ],
    exports: [
        RxReactiveFormsModule
    ]
})
export class SharedModule {
}
