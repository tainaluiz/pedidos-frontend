import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriasPage } from './categorias';
import { CartButtonModule } from '../../components/cart-button/cart-button.module';

@NgModule({
  declarations: [
    CategoriasPage,
  ],
  imports: [
    CartButtonModule,
    IonicPageModule.forChild(CategoriasPage),
  ],
})
export class CategoriasPageModule {}
