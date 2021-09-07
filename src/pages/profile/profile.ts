import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  profileImage: any;

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
    public camera: Camera,
    public sanitizer: DomSanitizer) {
    this.profileImage = 'assets/imgs/avatar-blank.png';
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
      .subscribe((response) => {
        this.cliente.imageUrl = this.clienteService.getFormattedUrlImageFromBucket(this.cliente.id);
        this.blobToDataURL(response).then((dataUrl: string) => {
          this.profileImage = this.sanitizer.bypassSecurityTrustUrl(dataUrl);
        });
      }, () => {
        this.profileImage = 'assets/imgs/avatar-blank.png';
      });
  }

  blobToDataURL(blob: any) {
    return new Promise((fullfill, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => fullfill(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  getPicture() {
    this.cameraOn = true;
    this.camera.getPicture(this.camOptions).then((imageData) => {
      this.cameraOn = false;
      this.picture = 'data:image/png;base64,' + imageData;
    }, (err) => {
      console.log(err);
      this.cameraOn = false
    });
  }

  getCameraPicture() {
    this.camOptions.sourceType = this.camera.PictureSourceType.CAMERA;
    this.getPicture();
  }

  getGalleryPicture() {
    this.camOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    this.getPicture();
  }

  sendPicture() {
    this.clienteService.uploadPicture(this.picture)
      .subscribe(() => {
        this.picture = null;
        this.getImageIfExists();
      }, () => { })
  }

  cancel() {
    this.picture = null;
  }

}
