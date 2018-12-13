import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { BreakfastmainPage } from '../breakfastmain/breakfastmain';
import { FavouriteProvider } from '../../providers/favourite/favourite';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-beehoon',
  templateUrl: 'beehoon.html',
})
export class BeehoonPage {
  DimsumCards: any;
  favorite: boolean =false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase,private favoriteservice: FavouriteProvider) {
 
     // retrieve data from BreakfastCards in firebase
     database.list('/BreakfastCards',
    ref => ref.orderByChild('name').equalTo('Bee Hoon'))
   
    .valueChanges().subscribe(
      list=> {
        this.DimsumCards = list;
    });

    //isfav

      firebase.database().ref(`/BreakfastCards/beehoon`).once('value').then(snapshot => {
      console.log(snapshot.val().name );
      this.favorite = this.favoriteservice.isFavorite(snapshot.val().name);
    });
   
  }



  back(){
    this.navCtrl.setRoot(BreakfastmainPage);
  }

  addToFavorites(){
  firebase.database().ref(`/BreakfastCards/beehoon`).once('value').then(snapshot => {
      console.log(snapshot.val().name );
      this.favorite = this.favoriteservice.addFavorite(snapshot.val().name);
  });
  }


}

