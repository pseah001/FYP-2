import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from "angularfire2/database"; 


@IonicPage()
@Component({
  selector: 'page-coffee',
  templateUrl: 'coffee.html',
  
})
export class CoffeePage {
  CoffeeCards: any;
  kopisugarlevel: any[] /* { '0': 0 } */;
  kopisugarvalue1: any/* { '0': 0 } */;
  kopisugarvalue: any;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public database: AngularFireDatabase
    ) {
      // retrieve data from CoffeeCards in firebase
      database.list('/CoffeeCards').valueChanges().subscribe(
        list=> {
          this.CoffeeCards = list;
      });
  }

  onChangekopiSugar($index) {
 /* console.log($index);
    console.log(this.kopisugarlevel);
    console.log(this.kopisugarvalue); */

      if (this.kopisugarlevel[$index] == 10) { this.kopisugarvalue = "-Siew-Dai" }
      if (this.kopisugarlevel[$index] == 20) { this.kopisugarvalue = "" }
      if (this.kopisugarlevel[$index] == 30) { this.kopisugarvalue =  "-Gah-Dai"}
      if (this.kopisugarlevel[$index] == 0) { this.kopisugarvalue= "-Kosong" }

  }

  trackByIdx(index, obj) {
    return index;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoffeePage');
  }
}
