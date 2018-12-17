import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { BreakfastmainPage } from '../breakfastmain/breakfastmain';
import { FavouriteProvider } from '../../providers/favourite/favourite';
import firebase from 'firebase';
/**
 * Generated class for the RotiprataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rotiprata',
  templateUrl: 'rotiprata.html',
})
export class RotiprataPage {
  DimsumCards: any;
  favorite: boolean =false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase,private favoriteservice: FavouriteProvider) {
  

    // retrieve data from BreakfastCards in firebase
    database.list('/BreakfastCards',
    ref => ref.orderByChild('name').equalTo('prata'))
   
    .valueChanges().subscribe(
      list=> {
        this.DimsumCards = list;
    });

    //isfav

      firebase.database().ref(`/BreakfastCards/prata`).once('value').then(snapshot => {
      console.log(snapshot.val().name );
      this.favorite = this.favoriteservice.isFavorite(snapshot.val().name);
    });
   
  }



  back(){
    this.navCtrl.setRoot(BreakfastmainPage);
  }

  addToFavorites(){
  firebase.database().ref(`/BreakfastCards/prata`).once('value').then(snapshot => {
      console.log(snapshot.val().name );
      this.favorite = this.favoriteservice.addFavorite(snapshot.val().name);
      console.log(snapshot.val().cuisine );
      //create fav in database with specific userid as keys
     var database =firebase.database();
     var userId = firebase.auth().currentUser.uid;
     var ref =database.ref('fav/'+ userId);
     //grab dimsum as key
     var childKey = snapshot.child("/BreakfastCards/prata").key; 
     console.log(childKey );
     //push selected fav's info into fav db
     ref.child(childKey).set(snapshot.val());
  });
  }


}
