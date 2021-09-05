import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from './../../models/endereco.dts';
import { CartService } from './../../services/domain/cart.service';
import { PedidoDTO } from './../../models/pedido.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    const localUser = this.storageService.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];
          this.createNewPedido(response);
        },
          error => {
            if (error.status == 403) {
              this.redirectToHome();
            }
          });
    } else {
      this.redirectToHome();
    }
  }

  redirectToHome() {
    this.navCtrl.setRoot('HomePage');
  }

  createNewPedido(response: any) {
    const cart = this.cartService.getCart();

    this.pedido = {
      cliente: { id: response['id'] },
      items: cart.items.map(i => {
        return {
          quantidade: i.quantidade,
          produto: {
            id: i.produto.id
          }
        }
      })
    }
  }

  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = {
      id: item.id
    };
    this.navCtrl.push('PaymentPage', { pedido: this.pedido });
  }

}
