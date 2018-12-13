import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { DrinksmainPage } from '../drinksmain/drinksmain';
import { FavouriteProvider } from '../../providers/favourite/favourite';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-kopic',
  templateUrl: 'kopic.html',
})
export class KopicPage {
  Cards: any;
  favorite: boolean =false;

  //sugarlevel
  sugarvalue: any;
  sugarlevel= 20;
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase,private favoriteservice: FavouriteProvider) {
 
    // retrieve data from BreakfastCards in firebase
    database.list('/Drinkscards',
    ref => ref.orderByChild('name').equalTo('Kopi-C'))
   
    .valueChanges().subscribe(
      list=> {
        this.Cards = list;
    });

    //isfav

      firebase.database().ref('/Drinkscards/Kopi-C').once('value').then(snapshot => {
      console.log(snapshot.val().name );
      this.favorite = this.favoriteservice.isFavorite(snapshot.val().name);
    });
   
  }

  //sugarlevel
  onChangeSugar() {
         if (this.sugarlevel == 10) { this.sugarvalue = "-Siew-Dai" }
         if (this.sugarlevel == 20) { this.sugarvalue = "" }
         if (this.sugarlevel == 30) { this.sugarvalue =  "-Gah-Dai"}
         if (this.sugarlevel == 0) { this.sugarvalue= "-Kosong" }
   
     }



  back(){
    this.navCtrl.setRoot(DrinksmainPage);
  }

  addToFavorites(){
  firebase.database().ref(`/Drinkscards/Kopi-C`).once('value').then(snapshot => {
      console.log(snapshot.val().name );
      this.favorite = this.favoriteservice.addFavorite(snapshot.val().name);
  });
  }

}
