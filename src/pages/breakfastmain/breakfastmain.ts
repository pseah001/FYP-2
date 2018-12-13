import { Component,OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { DimsumPage} from '../dimsum/dimsum';
import { BeehoonPage } from '../beehoon/beehoon';
import { RotiprataPage } from '../rotiprata/rotiprata';
import { KayatoastPage } from '../kayatoast/kayatoast';
import * as _ from 'lodash';


@IonicPage()
@Component({
  selector: 'page-breakfastmain',
  templateUrl: 'breakfastmain.html',
})
export class BreakfastmainPage implements OnInit {
  BreakfastCards: any;
  FilteredBreakfastCards: any;
  //filter properties
  cuisine: string;
  dietary: string;
  //active filter rules
  filters = {};
  buttonColor: string = "primary";
  sIndex: number = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase,) {
   
/*     // retrieve data from BreakfastCards in firebase
    database.list('/BreakfastCards').valueChanges().subscribe(
      list=> {
        this.BreakfastCards = list;
    });
 */
    
  }


  //page nav
  direct(item_key){

    switch(item_key) { 
      case "Bee Hoon": { 
        this.navCtrl.setRoot(BeehoonPage);
         break; 
      } 
      case "Dim Sum": { 
        this.navCtrl.setRoot(DimsumPage);
         break; 
      }
      case "Roti Prata": { 
        this.navCtrl.setRoot(RotiprataPage);
         break; 
      } 
      case "Kaya Toast": { 
        this.navCtrl.setRoot(KayatoastPage);
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
    this.database.list('/BreakfastCards')
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
