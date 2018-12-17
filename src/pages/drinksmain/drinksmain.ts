import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as _ from 'lodash';
import { KopiPage } from '../kopi/kopi';
import { TehPage } from '../teh/teh';
import { MiloPage } from '../milo/milo';
import { BundungPage } from '../bundung/bundung';
import { HaliaPage } from '../halia/halia';


@IonicPage()
@Component({
  selector: 'page-drinksmain',
  templateUrl: 'drinksmain.html',
})
export class DrinksmainPage {
  BreakfastCards: any;
  FilteredBreakfastCards: any;
  //filter properties
  type: string;
  dietary: string;
  //active filter rules
  filters = {};
  buttonColor: string = "primary";
  sIndex: number = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase,) {
  }

    //page nav
    direct(item_key){

      switch(item_key) { 
        case "Kopi": { 
          this.navCtrl.setRoot(KopiPage);
           break; 
        } 

        case "Teh": { 
          this.navCtrl.setRoot(TehPage);
           break; 
        }
        case "Milo": { 
          this.navCtrl.setRoot(MiloPage);
           break; 
        } 
        case "Bandung": { 
          this.navCtrl.setRoot(BundungPage);
           break; 
        } 
        case "Teh Halia": { 
          this.navCtrl.setRoot(HaliaPage);
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
      this.database.list('/Drinkscards')
      .valueChanges().subscribe( list=> {
          this.BreakfastCards = list;
          console.log("Invalid choice"); 
          this.applyFilters();
          console.log("opps"); 
  
      })
    }
  
  
    private applyFilters(){
      console.log("opps2"); 
      this.FilteredBreakfastCards = _.filter(this.BreakfastCards, _.conforms(this.filters))
    }
    
   //filter property by equality to rule
   filterExact(property: string, rule: any){
    console.log("opps3"); 
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
