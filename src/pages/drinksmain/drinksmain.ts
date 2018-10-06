import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CoffeePage } from '../coffee/coffee';

/**
 * Generated class for the DrinksmainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-drinksmain',
  templateUrl: 'drinksmain.html',
})
export class DrinksmainPage {

  coffee(){
    this.navCtrl.setRoot(CoffeePage);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DrinksmainPage');
  }

}
