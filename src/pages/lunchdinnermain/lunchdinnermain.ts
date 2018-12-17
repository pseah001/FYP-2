import { Component, OnInit  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';
import { AngularFireDatabase } from 'angularfire2/database';
import { PadangPage } from '../padang/padang';
import { BiryaniPage } from '../biryani/biryani';
import { LormeePage } from '../lormee/lormee';
import { CurrychickenPage } from '../currychicken/currychicken';
import { CrabPage } from '../crab/crab';
import { ChickenricePage } from '../chickenrice/chickenrice';

/**
 * Generated class for the LunchdinnermainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lunchdinnermain',
  templateUrl: 'lunchdinnermain.html',
})
export class LunchdinnermainPage implements OnInit {
  LunchdinnerCards: any;
  FilteredLunchdinnerCards: any;
  //filter properties
  cuisine: string;
  type: string;
  dietary: string;
  //active filter rules
  filters = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase,) {

  }

  //page nav
  direct(item_key){

    switch(item_key) { 
      case "Nasi Padang": { 
        this.navCtrl.setRoot(PadangPage);
         break; 
      } 
      case "Nasi Biryani": { 
        this.navCtrl.setRoot(BiryaniPage);
         break; 
      } 
      case "Lor Mee": { 
        this.navCtrl.setRoot(LormeePage);
         break; 
      }  
      case "Chicken Rice": { 
        this.navCtrl.setRoot(ChickenricePage);
         break; 
      }  
      case "Curry": { 
        this.navCtrl.setRoot(CurrychickenPage);
         break; 
      }  
      case "Crab": { 
        this.navCtrl.setRoot(CrabPage);
         break; 
      }  
      default: { 
        console.log("Invalid choice"); 
        break;              
     } 
    }
  }


//filter
ngOnInit(){
  this.database.list('/LunchdinnerCards')
  .valueChanges().subscribe( list=> {
      this.LunchdinnerCards = list;
      this.applyFilters()

  })
}


private applyFilters(){
  this. FilteredLunchdinnerCards = _.filter(this.LunchdinnerCards, _.conforms(this.filters))
}

//filter property by equality to rule
filterExact(property: string, rule: any){
 this.filters[property] =val => val ==rule
 this.applyFilters()
}

//remove filter
removeFilter(property: string){
 delete this.filters[property]
 this[property] =null
 this.applyFilters()
}
}
