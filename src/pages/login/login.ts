import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { User } from '../../models/user';
import {AngularFireAuth} from "angularfire2/auth";
import { Facebook,FacebookLoginResponse } from '@ionic-native/facebook';
import firebase from 'firebase';
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
    public navParams: NavParams,
    public facebook: Facebook) {
  }

 async login(user: User) {
  try{
    const result= await this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
    
    if(result){
      this.navCtrl.setRoot('HomePage');
    }
  }
  catch(e){
    console.error(e);
  }
 }

 register(){
   this.navCtrl.push('RegisterPage');
 }

loginfb(){
this.facebook.login(['email'])  .then((loginResponse) =>{

 let credential = firebase.auth.FacebookAuthProvider.credential(loginResponse.authResponse.accessToken);

      firebase.auth().signInWithCredential(credential).then((info) => { 
         alert(JSON.stringify(info));
         console.log("fuck")
      })
    })
  }
}