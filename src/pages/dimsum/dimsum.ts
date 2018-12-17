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
  userID: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase,private favoriteservice: FavouriteProvider) {

    // retrieve data from BreakfastCards in firebase
     database.list('/BreakfastCards',
    ref => ref.orderByChild('name').equalTo('dimsum'))
   
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
      //store in fav array so heart will remain colored
      this.favorite = this.favoriteservice.addFavorite(snapshot.val().name);

      console.log(snapshot.val().cuisine );
       //create fav in database with specific userid as keys
      var database =firebase.database();
      var userId = firebase.auth().currentUser.uid;
      var ref =database.ref('fav/'+ userId);
      //grab dimsum as key
      var childKey = snapshot.child("/BreakfastCards/dimsum").key; 
      console.log(childKey );
      //push selected fav's info into fav db
      ref.child(childKey).set(snapshot.val());

      
  });
  }

}
