import { StorageService } from './../../services/storage.service';
import { AuthService } from './../../services/auth.service';
import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public authService: AuthService,
    public storageService: StorageService) {
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidEnter() {
    const localUser = this.storageService.getLocalUser();
    if (localUser) {
      this.authService.refreshToken()
        .subscribe(response => {
          this.authService.successfulLogin(response.headers.get('Authorization'));
          this.navCtrl.setRoot('CategoriasPage');
        }, () => { })
    }
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  login() {
    this.authService.authenticate(this.creds)
      .subscribe(response => {
        this.authService.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      }, () => { })
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

}
