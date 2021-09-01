import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoService } from './../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    this.findById();
  }

  findById() {
    this.produtoService.findById(this.navParams.get('produto_id'))
      .subscribe(response => {
        this.item = response;
        this.getImageIfExists();
      }, () => { });
  }

  getImageIfExists() {
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(() => {
        this.item.imageUrl = this.produtoService.getFormattedUrlImageFromBucket(this.item.id);
      }, () => { });
  }


}
