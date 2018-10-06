import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CoffeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coffee',
  templateUrl: 'coffee.html',
  
})
export class CoffeePage {

  kopiosugarlevel: any;
  kopicsugarlevel: any;
  kopiosugarvalue: any;
  kopicsugarvalue: any;
  textChangeSugar: any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.textChangeSugar = ["-Kosong", "-Siew-Dai", "", "-Gah-Dai"];

  }
  onChangekopioSugar() {
    if (this.kopiosugarlevel == 0) { this.kopiosugarvalue = "kopi-O"+ this.textChangeSugar[0] }
    if (this.kopiosugarlevel == 10) { this.kopiosugarvalue = "kopi-O"+ this.textChangeSugar[1] }
    if (this.kopiosugarlevel == 20) { this.kopiosugarvalue = "kopi-O"+ this.textChangeSugar[2] }
    if (this.kopiosugarlevel == 30) { this.kopiosugarvalue = "kopi-O"+ this.textChangeSugar[3] }

}
onChangekopicSugar() {
  if (this.kopicsugarlevel == 0) { this.kopicsugarvalue = "kopi-C"+ this.textChangeSugar[0] }
  if (this.kopicsugarlevel == 10) { this.kopicsugarvalue = "kopi-C"+ this.textChangeSugar[1] }
  if (this.kopicsugarlevel == 20) { this.kopicsugarvalue = "kopi-C"+ this.textChangeSugar[2] }
  if (this.kopicsugarlevel == 30) { this.kopicsugarvalue = "kopi-C"+ this.textChangeSugar[3] }

}
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoffeePage');
  }

}
