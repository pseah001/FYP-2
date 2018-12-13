import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { BreakfastmainPage } from '../breakfastmain/breakfastmain';
import { FavouriteProvider } from '../../providers/favourite/favourite';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-dimsum',
  templateUrl: 'dimsum.html',
})
export class DimsumPage {
  DimsumCards: any;
  favorite: boolean =false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase,private favoriteservice: FavouriteProvider) {

    // retrieve data from BreakfastCards in firebase
     database.list('/BreakfastCards',
    ref => ref.orderByChild('name').equalTo('Dim Sum'))
   
    .valueChanges().subscribe(
      list=> {
        this.DimsumCards = list;
    });

    //isfav

      firebase.database().ref(`/BreakfastCards/dimsum`).once('value').then(snapshot => {
      console.log(snapshot.val().name );
      this.favorite = this.favoriteservice.isFavorite(snapshot.val().name);
    });
   
  }



  back(){
    this.navCtrl.setRoot(BreakfastmainPage);
  }

  addToFavorites(){
  firebase.database().ref(`/BreakfastCards/dimsum`).once('value').then(snapshot => {
      console.log(snapshot.val().name );
      this.favorite = this.favoriteservice.addFavorite(snapshot.val().name);
  });
  }

}
