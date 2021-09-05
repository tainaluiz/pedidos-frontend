import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from './../../models/pedido.dto';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  pedido: PedidoDTO;
  parcelas: number[] = Array(12).fill(0).map((x, i) => ++i);

  formGroup: FormGroup

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {
    this.pedido = this.navParams.get('pedido');
    this.formGroup = this.formBuilder.group({
      numeroDeParcelas: [1, Validators.required],
      '@type': ['pagamentoComCartao', Validators.required]
    });
  }

  nextPage() {
    this.pedido.pagamento = this.formGroup.value;
    this.navCtrl.setRoot('OrderConfirmationPage', { pedido: this.pedido });
  }

}
