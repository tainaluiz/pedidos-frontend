import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
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
  picture: string;
  cameraOn: boolean;

  camOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageService,
    public clienteService: ClienteService,
    public camera: Camera) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
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

  getCameraPicture() {
    this.cameraOn = true;
    this.camera.getPicture(this.camOptions).then((imageData) => {
      this.cameraOn = false;
      this.picture = 'data:image/png;base64,' + imageData;
    }, (err) => {
      console.log(err);
      this.cameraOn = false
    });
  }

  sendPicture() {
    this.clienteService.uploadPicture(this.picture)
      .subscribe(() => {
        this.picture = null;
        this.loadData();
      }, () => { })
  }

  cancel() {
    this.picture = null;
  }

}
