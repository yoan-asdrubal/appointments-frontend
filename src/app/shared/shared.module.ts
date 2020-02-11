import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RxReactiveFormsModule
    ],
    exports: [
        ReactiveFormsModule,
        RxReactiveFormsModule
    ]
})
export class SharedModule {
}
