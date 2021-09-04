import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from './../../models/cliente.dto';
import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageService,
    public clienteService: ClienteService,) {
  }

  ionViewDidLoad() {
    const localUser = this.storageService.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe((response: ClienteDTO) => {
          this.cliente = response;
          this.getImageIfExists();
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

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(() => {
        this.cliente.imageUrl = this.clienteService.getFormattedUrlImageFromBucket(this.cliente.id);
      }, () => { });
  }

}
