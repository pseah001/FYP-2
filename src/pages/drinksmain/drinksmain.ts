import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as _ from 'lodash';
import { KopicPage } from '../kopic/kopic';
import { KopioPage } from '../kopio/kopio';
import { KopiPage } from '../kopi/kopi';


@IonicPage()
@Component({
  selector: 'page-drinksmain',
  templateUrl: 'drinksmain.html',
})
export class DrinksmainPage {
  BreakfastCards: any;
  FilteredBreakfastCards: any;
  //filter properties
  Type: string;
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
        case "Kopi-O": { 
          this.navCtrl.setRoot(KopioPage);
           break; 
        }
        case "Kopi-C": { 
          this.navCtrl.setRoot(KopicPage);
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
          this.applyFilters()
  
      })
    }
  
  
    private applyFilters(){
      this.FilteredBreakfastCards = _.filter(this.BreakfastCards, _.conforms(this.filters))
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
