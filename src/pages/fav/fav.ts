import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { PadangPage } from '../padang/padang';
import { LemakPage } from '../lemak/lemak';
import { BiryaniPage } from '../biryani/biryani';
import { LormeePage } from '../lormee/lormee';
import { ChickenricePage } from '../chickenrice/chickenrice';
import { CurrychickenPage } from '../currychicken/currychicken';
import { CrabPage } from '../crab/crab';
import { BeehoonPage } from '../beehoon/beehoon';
import { DimsumPage } from '../dimsum/dimsum';
import { RotiprataPage } from '../rotiprata/rotiprata';
import { KayatoastPage } from '../kayatoast/kayatoast';
import { KopiPage } from '../kopi/kopi';
import { TehPage } from '../teh/teh';
import { MiloPage } from '../milo/milo';
import { BundungPage } from '../bundung/bundung';

/**
 * Generated class for the FavPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fav',
  templateUrl: 'fav.html',
})
export class FavPage {
  fav: any;
  child: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase,) {
  }
  //print cards into fav by userid
  ngOnInit(){
    var userId = firebase.auth().currentUser.uid;
    this.database.list('fav/'+ userId)
    .valueChanges().subscribe( list=> {
        this.fav = list;
  
    })
  }

  //delete card
  delete(item_key){
    var userId = firebase.auth().currentUser.uid;
    console.log(item_key);

   firebase.database().ref('fav/'+ userId).child(item_key).remove();{ 
 
        //create fav in database with specific userid as keys
/*        var database =firebase.database();
       var ref =database.ref('fav/');
       //grab dimsum as key
       var childKey = snapshot.child('fav/'+ userId).key;  
       console.log(childKey ); 
       var itemKey = snapshot.child('fav/'+ item_key).key;  
       console.log(itemKey ); 
       //push selected fav's info into fav db
       ref.child(childKey).child(itemKey).remove(snapshot.val()); */
 /*       console.log("hey");
       this.database.object('fav/'+ userId + item_key).remove();
    }); */
  }
  }

    //page nav
    direct(item_key){

      switch(item_key) { 
        //drinks
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

        //breakfast
        case "Fried Noodles": { 
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
        //lunchdinner
        case "Nasi Padang": { 
          this.navCtrl.setRoot(PadangPage);
           break; 
        } 
        case "Nasi Lemak": { 
          this.navCtrl.setRoot(LemakPage);
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
        case "Curry Chicken": { 
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

}
