import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { User } from '../../models/user';
import {AngularFireAuth} from "angularfire2/auth";
import { AuthService } from '../core/auth.service';
import { PrimarytabsPage } from '../primarytabs/primarytabs';
import { Facebook } from '@ionic-native/facebook';


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
    public facebook: Facebook
   ) {
  }

  async login(user: User) {
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