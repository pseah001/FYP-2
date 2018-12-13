import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AuthService } from '../core/auth.service';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {


  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams,public authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.app.getRootNavs()[0].setRoot(LoginPage);
    }, (error) => {
      console.log("Logout error", error);
    });
  }

}
