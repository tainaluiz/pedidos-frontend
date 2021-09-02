import { IonicModule } from 'ionic-angular';
import { NgModule } from "@angular/core";
import { CartButtonComponent } from './cart-button.component';

@NgModule({
    declarations: [
        CartButtonComponent
    ],
    imports: [
        IonicModule,
    ],
    exports: [
        CartButtonComponent
    ]
})
export class CartButtonModule { }