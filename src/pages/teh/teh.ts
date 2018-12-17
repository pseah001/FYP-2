import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { DrinksmainPage } from '../drinksmain/drinksmain';
import { FavouriteProvider } from '../../providers/favourite/favourite';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-teh',
  templateUrl: 'teh.html',
})
export class TehPage {
  Cards: any;
  favorite: boolean =false;

  //sugarlevel
  sugarvalue: any;
  sugarlevel= 20;
  icevalue: any;
  icelevel= 0;
  milkvalue: any;
  milklevel= 20;
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase,private favoriteservice: FavouriteProvider) {
 
    // retrieve data from BreakfastCards in firebase
    database.list('/Drinkscards',
    ref => ref.orderByChild('name').equalTo('Teh'))
   
    .valueChanges().subscribe(
      list=> {
        this.Cards = list;
    });

    //isfav

      firebase.database().ref('/Drinkscards/Teh').once('value').then(snapshot => {
      console.log(snapshot.val().name );
      this.favorite = this.favoriteservice.isFavorite(snapshot.val().name);
    });
   
  }

  //milklevel
  onChangeMilk() {
    if (this.milklevel == 10) { this.milkvalue = " C" }
    if (this.milklevel == 20) { this.milkvalue = " " }
    if (this.milklevel == 0) { this.milkvalue= " O" }
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
  firebase.database().ref(`/Drinkscards/Teh`).once('value').then(snapshot => {
      console.log(snapshot.val().name );
      this.favorite = this.favoriteservice.addFavorite(snapshot.val().name);
      console.log(snapshot.val().cuisine );
      //create fav in database with specific userid as keys
     var database =firebase.database();
     var userId = firebase.auth().currentUser.uid;
     var ref =database.ref('fav/'+ userId);
     //grab dimsum as key
     var childKey = snapshot.child("/Drinkscards/Teh").key; 
     console.log(childKey );
     //push selected fav's info into fav db
     ref.child(childKey).set(snapshot.val());
  });
  }

}
