import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import {AngularFireAuth} from "angularfire2/auth";
import { AuthService } from '../core/auth.service';
import { PrimarytabsPage } from '../primarytabs/primarytabs';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  user = {} as User;
  errorMessage: string = '';
  userProfile: any = null;
  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public facebook: Facebook,
    public toastCtrl: ToastController
   ) {
  }

/*   async login(user: User) {
    try{
      const result= await this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      
      if(result){
        this.navCtrl.push(PrimarytabsPage);
      }
    }
    catch(e){
      console.error(e);
    }
  }
 */
  login(){

    firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
    .then((user) => {
      console.log(user)

      this.toastCtrl.create({
        message: "Welcome " + user.user.displayName,
        duration: 3000
      }).present();

      this.navCtrl.setRoot(PrimarytabsPage)

    }).catch((err) => {
      console.log(err)
      this.toastCtrl.create({
        message: err.message,
        duration: 3000
      }).present();
    })

  }

  register(){
    this.navCtrl.push('RegisterPage');
  } 


  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then((res) => {
      this.navCtrl.push(PrimarytabsPage);
    }, (err) => {
      this.errorMessage = err.message;
    });
  }

//   tryFacebookLogin(): Promise<any>{
//     alert("bye");
//     return this.facebook.login(['email'])
   
//     .then( response => {
//       const facebookCredential = firebase.auth.FacebookAuthProvider
//         .credential(response.authResponse.accessToken);
// alert("hi");
//       firebase.auth().signInWithCredential(facebookCredential)
//         .then( success => { 
//           alert("why");
//           alert("Firebase success: " + JSON.stringify(success)); 
          
//         });

//     }).catch((error) => { console.log(error) });
//   }

/*
tryFacebookLogin(){
  this.authService.doFacebookLogin()
  .then((res) => {
    this.navCtrl.setRoot(PrimarytabsPage);
  }, (err) => {
    this.errorMessage = err.message;
  });
}

*/

}