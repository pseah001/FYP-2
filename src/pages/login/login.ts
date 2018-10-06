import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { User } from '../../models/user';
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  user = {} as User;

  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

 async login(user: User) {
  try{
    const result= await this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
    
    if(result){
      this.navCtrl.setRoot('PrimarytabsPage');
    }
  }
  catch(e){
    console.error(e);
  }
 }

 register(){
   this.navCtrl.push('RegisterPage');
 }

}