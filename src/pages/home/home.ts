import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, ToastController, Nav } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Nav) nav: Nav; 
  pages: Array<{title: string, component: any, openTab? : any}>;
  rootPage = 'DashboardTabsPage';
       
  constructor(
    private afAuth: AngularFireAuth,
    private toast: ToastController,
    public navCtrl: NavController, 
    public navParams: NavParams) {

      this.pages = [
        {title: 'Hawker', component: 'HawkerPage' },
        {title: 'Social', component: 'SocialPage' },
        {title: 'Tourguide', component: 'TourguidePage' },
        {title: 'Chat', component: 'ChatPage' },
        {title: 'Profile', component: 'ProfilePage', openTab: 1 },
        {title: 'Dashboard', component: 'DashboardTabsPage'},
      ];
  }

  openPage(page) {
    this.nav.setRoot(page.component, { openTab: page.openTab });
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {

      if(data && data.email && data.uid){
        this.toast.create({
          message: `Welcome to FYP, ${data.email}`,
          duration: 3000
        }).present();
      }
      else {
        this.toast.create({
          message: `Opps! Details not vaild`,
          duration: 3000  
        }).present();
      }
    })
  }

} 
