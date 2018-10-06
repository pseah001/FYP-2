import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

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


  constructor(public navCtrl: NavController) {}

}
