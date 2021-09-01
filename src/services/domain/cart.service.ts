import { ProdutoDTO } from './../../models/produto.dto';
import { Injectable } from "@angular/core";
import { Cart } from './../../models/cart';
import { StorageService } from './../storage.service';

@Injectable()
export class CartService {

    constructor(public storageService: StorageService) {
    }

    createOrClearCart(): Cart {
        let cart: Cart = {
            items: []
        }
        this.storageService.setCart(cart);
        return cart;
    }

    getCart(): Cart {
        let cart: Cart = this.storageService.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(p => p.produto.id == produto.id);
        if (position === -1) {
            cart.items.push({
                quantidade: 1,
                produto
            })
        }
        this.storageService.setCart(cart);
        return cart;
    }
}