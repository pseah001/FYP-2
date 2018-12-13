import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the PrimarytabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-primarytabs',
  templateUrl: 'primarytabs.html'
})
export class PrimarytabsPage {

  mainRoot = 'MainPage'
  favRoot = 'FavPage'
  cameraRoot = 'CameraPage'
  feedRoot = 'FeedPage'
  profileRoot = 'ProfilePage'
  myphoto:any;


  constructor(public navCtrl: NavController,private camera:Camera) {}

  takephoto(){
    const options: CameraOptions = {
      quality:70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
    this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

}
