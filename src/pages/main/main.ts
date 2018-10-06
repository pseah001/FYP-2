import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DrinksmainPage } from '../drinksmain/drinksmain';
import { BreakfastmainPage } from '../breakfastmain/breakfastmain';
import { LunchmainPage } from '../lunchmain/lunchmain';
import { DinnermainPage } from '../dinnermain/dinnermain';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  drinksmain(){
    this.navCtrl.setRoot(DrinksmainPage);
  }
  breakfastmain(){
    this.navCtrl.setRoot(BreakfastmainPage);
  }
  
  lunchmain(){
    this.navCtrl.setRoot(LunchmainPage);
  }
  dinnermain(){
    this.navCtrl.setRoot(DinnermainPage);
  }
  
  
  



  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

}
