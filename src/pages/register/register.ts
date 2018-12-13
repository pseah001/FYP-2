import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Events } from 'ionic-angular';
import { User } from '../../models/user';
import {AngularFireAuth} from "angularfire2/auth";
import { AuthService } from '../core/auth.service';
import { PrimarytabsPage } from '../primarytabs/primarytabs';
import { NgForm } from '@angular/forms';
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

  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams,public authService: AuthService, public events: Events) {
  }

  // tryFacebookLogin(){
  //   this.authService.doFacebookLogin()
  //   .then((res) => {
  //     this.navCtrl.push(PrimarytabsPage);
  //   }, (err) => {
  //     this.errorMessage = err.message;
  //   });
  // }

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

 async register(user: User){
  try{
    const result= await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    console.log(result);
  }
  catch(e){
    console.error(e);
  }
 }
}
