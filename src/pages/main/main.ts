import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DrinksmainPage } from '../drinksmain/drinksmain';
import { BreakfastmainPage } from '../breakfastmain/breakfastmain';
import { LunchdinnermainPage } from '../lunchdinnermain/lunchdinnermain';
import { CulturePage } from '../culture/culture';


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

  culturemain(){
    this.navCtrl.setRoot(CulturePage);
  }
  drinksmain(){
    this.navCtrl.setRoot(DrinksmainPage);
  }
  breakfastmain(){
    this.navCtrl.setRoot(BreakfastmainPage);
  }
  
  lunchdinnermain(){
    this.navCtrl.setRoot(LunchdinnermainPage);
  }

  



  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

}
