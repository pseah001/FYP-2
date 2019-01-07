import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Events, ToastController, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import {AngularFireAuth} from "angularfire2/auth";
import { AuthService } from '../core/auth.service';
import { PrimarytabsPage } from '../primarytabs/primarytabs';
import firebase from 'firebase';

@IonicPage() 
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;
  errorMessage: string = '';
  successMessage: string = '';
  submitted = false;
  message: any;
  name: string = "";

  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams,public authService: AuthService, public events: Events,public toastCtrl: ToastController, public alertCtrl: AlertController) {
  }

  // tryFacebookLogin(){
  //   this.authService.doFacebookLogin()
  //   .then((res) => {
  //     this.navCtrl.push(PrimarytabsPage);
  //   }, (err) => {
  //     this.errorMessage = err.message;
  //   });
  // }

  //back
  back(){
    this.navCtrl.pop();
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then((res) => {
      this.navCtrl.push(PrimarytabsPage);
    }, (err) => {
      this.errorMessage = err.message;
    });
  }
  
  goLoginPage(){
    this.navCtrl.pop();
  }

/*  async register(user: User){
  try{
    const result= await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    console.log(result);
  }
  catch(e){
    console.error(e);
  }
 }
 */
 signup(){
  firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
  .then((data) => {
    
    console.log(data)

    let newUser: firebase.User = data.user;
    newUser.updateProfile({
      displayName: this.name,
      photoURL: ""
    }).then(() => {
      console.log("Profile Updated")

      this.alertCtrl.create({
        title: "Account Created",
        message: "Your account has been created successfully.",
        buttons: [
          {
            text: "OK",
            handler: () => {
              //Navigate to the feeds page
              this.navCtrl.setRoot(PrimarytabsPage)
            }
          }
        ]
      }).present();

    }).catch((err) => {
      console.log(err)
    })

  }).catch((err) => {
    console.log(err)
    this.toastCtrl.create({
      message: err.message,
      duration: 3000
    }).present();
  })
}
}
