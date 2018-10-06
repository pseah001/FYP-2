import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth'; 
import { Facebook } from '@ionic-native/facebook';
import { FavPageModule } from '../pages/fav/fav.module';
import { CameraPageModule } from '../pages/camera/camera.module';
import { FeedPageModule } from '../pages/feed/feed.module';
import { MainPageModule } from '../pages/main/main.module';
import { PrimarytabsPageModule } from '../pages/primarytabs/primarytabs.module';
import { CoffeePageModule } from '../pages/coffee/coffee.module';
import { DrinksmainPageModule } from '../pages/drinksmain/drinksmain.module';
import { LunchmainPageModule } from '../pages/lunchmain/lunchmain.module';
import { BreakfastmainPageModule } from '../pages/breakfastmain/breakfastmain.module';
import { DinnermainPageModule } from '../pages/dinnermain/dinnermain.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    FavPageModule,
    PrimarytabsPageModule,
    CameraPageModule,
    FeedPageModule,
    MainPageModule,
    CoffeePageModule,
    DrinksmainPageModule,
    LunchmainPageModule,
    BreakfastmainPageModule,
    DinnermainPageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
