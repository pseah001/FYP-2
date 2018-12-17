import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { LunchdinnermainPage } from '../lunchdinnermain/lunchdinnermain';
import { FavouriteProvider } from '../../providers/favourite/favourite';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-lemak',
  templateUrl: 'lemak.html',
})
export class LemakPage {
  DimsumCards: any;
  favorite: boolean =false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase,private favoriteservice: FavouriteProvider) {
  // retrieve data from BreakfastCards in firebase
  database.list('/BreakfastCards',
  ref => ref.orderByChild('name').equalTo('Nasi Lemak'))
 
  .valueChanges().subscribe(
    list=> {
      this.DimsumCards = list;
  });

  //isfav

    firebase.database().ref(`/BreakfastCards/Nasi Lemak`).once('value').then(snapshot => {
    console.log(snapshot.val().name );
    this.favorite = this.favoriteservice.isFavorite(snapshot.val().name);
  });
 
}



back(){
  this.navCtrl.setRoot(LunchdinnermainPage);
}

addToFavorites(){
firebase.database().ref(`/BreakfastCards/Nasi Lemak`).once('value').then(snapshot => {
    console.log(snapshot.val().name );
    this.favorite = this.favoriteservice.addFavorite(snapshot.val().name);
    console.log(snapshot.val().cuisine );
    //create fav in database with specific userid as keys
   var database =firebase.database();
   var userId = firebase.auth().currentUser.uid;
   var ref =database.ref('fav/'+ userId);
   //grab dimsum as key
   var childKey = snapshot.child("/BreakfastCards/Nasi Lemak").key; 
   console.log(childKey );
   //push selected fav's info into fav db
   ref.child(childKey).set(snapshot.val());
});
}

}