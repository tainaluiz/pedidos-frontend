import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    this.findByCategoria();
  }

  findByCategoria() {
    this.produtoService.findByCategoria(this.navParams.get('categoria_id'))
      .subscribe(response => {
        this.items = response['content'];
        this.loadImageUrls();
      }, () => { })
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

}
