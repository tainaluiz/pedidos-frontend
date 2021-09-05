import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.findByCategoria();
  }

  findByCategoria() {
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(this.navParams.get('categoria_id'))
      .subscribe(response => {
        this.items = response['content'];
        loader.dismiss();
        this.loadImageUrls();
      }, () => {
        loader.dismiss();
      })
  }

  loadImageUrls() {
    for (let item of this.items) {
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(() => {
          item.imageUrl = this.produtoService.getFormattedUrlSmallImageFromBucket(item.id);
        }, () => { });

    }
  }

  showDetail(produto_id: string) {
    this.navCtrl.push('ProdutoDetailPage', { produto_id })
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.findByCategoria();
    setTimeout(() => {
      refresher.complete();
    }, 100);
  }

}
