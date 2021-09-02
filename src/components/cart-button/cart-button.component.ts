import { Component } from '@angular/core';

@Component({
    selector: 'cart-button',
    template: `
        <button navPush="CartPage" ion-fab mini>
            <ion-icon name="cart"></ion-icon>
        </button>
    `
})
export class CartButtonComponent {

}
