import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutosPage } from './produtos';
import { CartButtonModule } from '../../components/cart-button/cart-button.module';

@NgModule({
  declarations: [
    ProdutosPage,
  ],
  imports: [
    CartButtonModule,
    IonicPageModule.forChild(ProdutosPage),
  ],
})
export class ProdutosPageModule {}
