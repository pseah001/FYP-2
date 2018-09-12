import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-hawker',
  templateUrl: 'hawker.html',
})
export class HawkerPage {

    tab1 = 'DrinksPage';
    tab2 = 'FoodPage';
    
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HawkerPage');
  }

}
