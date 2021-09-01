import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoService } from './../../services/domain/produto.service';
import { CartService } from './../../services/domain/cart.service';
import { CartItem } from './../../models/cart-item';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
  }

  loadImageUrls() {
    for (let item of this.items) {
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(() => {
          item.produto.imageUrl = this.produtoService.getFormattedUrlSmallImageFromBucket(item.produto.id);
        }, () => { });

    }
  }

}
