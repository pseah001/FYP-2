import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { DrinksmainPage } from '../drinksmain/drinksmain';
import { FavouriteProvider } from '../../providers/favourite/favourite';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-bundung',
  templateUrl: 'bundung.html',
})
export class BundungPage {
  Cards: any;
  favorite: boolean =false;

  //sugarlevel
  sugarvalue: any;
  sugarlevel= 20;
  icevalue: any;
  icelevel= 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase,private favoriteservice: FavouriteProvider) {
 
    // retrieve data from BreakfastCards in firebase
    database.list('/Drinkscards',
    ref => ref.orderByChild('name').equalTo('Bandung'))
   
    .valueChanges().subscribe(
      list=> {
        this.Cards = list;
    });

    //isfav

      firebase.database().ref('/Drinkscards/Bandung').once('value').then(snapshot => {
      console.log(snapshot.val().name );
      this.favorite = this.favoriteservice.isFavorite(snapshot.val().name);
    });
   
  }



  //sugarlevel
  onChangeSugar() {
         if (this.sugarlevel == 10) { this.sugarvalue = " Siew-Dai" }
         if (this.sugarlevel == 20) { this.sugarvalue = "" }
         if (this.sugarlevel == 30) { this.sugarvalue =  " Gah-Dai"}
         if (this.sugarlevel == 0) { this.sugarvalue= " Kosong" }
   
  }
  
  //ice level
  onChangeice() {
      if (this.icelevel == 0) { this.icevalue = "" }
      if (this.icelevel == 10) { this.icevalue = " Bing" }
  }


  back(){
    this.navCtrl.setRoot(DrinksmainPage);
  }

  addToFavorites(){
  firebase.database().ref(`/Drinkscards/Bandung`).once('value').then(snapshot => {
      console.log(snapshot.val().name );
      this.favorite = this.favoriteservice.addFavorite(snapshot.val().name);
      console.log(snapshot.val().cuisine );
      //create fav in database with specific userid as keys
     var database =firebase.database();
     var userId = firebase.auth().currentUser.uid;
     var ref =database.ref('fav/'+ userId);
     //grab dimsum as key
     var childKey = snapshot.child("/Drinkscards/Bandung").key; 
     console.log(childKey );
     //push selected fav's info into fav db
     ref.child(childKey).set(snapshot.val());
  });
  }

}
