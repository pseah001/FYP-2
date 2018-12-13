import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { LunchdinnermainPage } from '../lunchdinnermain/lunchdinnermain';
import { FavouriteProvider } from '../../providers/favourite/favourite';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-padang',
  templateUrl: 'padang.html',
})
export class PadangPage {
  DimsumCards: any;
  favorite: boolean =false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase,private favoriteservice: FavouriteProvider) {
 // retrieve data from BreakfastCards in firebase
 database.list('/LunchdinnerCards',
 ref => ref.orderByChild('name').equalTo('Nasi Padang'))

 .valueChanges().subscribe(
   list=> {
     this.DimsumCards = list;
 });

 //isfav

   firebase.database().ref(`/LunchdinnerCards/Nasi Padang`).once('value').then(snapshot => {
   console.log(snapshot.val().name );
   this.favorite = this.favoriteservice.isFavorite(snapshot.val().name);
 });

}



back(){
 this.navCtrl.setRoot(LunchdinnermainPage);
}

addToFavorites(){
firebase.database().ref(`/LunchdinnerCards/Nasi Padang`).once('value').then(snapshot => {
   console.log(snapshot.val().name );
   this.favorite = this.favoriteservice.addFavorite(snapshot.val().name);
});
}

}