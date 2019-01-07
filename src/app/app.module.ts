import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, LoadingController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth'; 
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { Facebook } from '@ionic-native/facebook';
import { FavPageModule } from '../pages/fav/fav.module';
import { CameraPageModule } from '../pages/camera/camera.module';
import { FeedPageModule } from '../pages/feed/feed.module';
import { MainPageModule } from '../pages/main/main.module';
import { PrimarytabsPageModule } from '../pages/primarytabs/primarytabs.module';
import { CoffeePageModule } from '../pages/coffee/coffee.module';
import { DrinksmainPageModule } from '../pages/drinksmain/drinksmain.module';
import { BreakfastmainPageModule } from '../pages/breakfastmain/breakfastmain.module';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { FirebaseService } from '../pages/service/firebase.service';
import { UserPageModule } from '../pages/user/user.module';
import { AuthService } from '../pages/core/auth.service';
import { UserService } from '../pages/core/user.service';
import { GooglePlus } from '@ionic-native/google-plus';
import { DimsumPageModule } from '../pages/dimsum/dimsum.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { RotiprataPageModule } from '../pages/rotiprata/rotiprata.module';
import { BeehoonPageModule } from '../pages/beehoon/beehoon.module';
import { KayatoastPageModule } from '../pages/kayatoast/kayatoast.module';
import { LunchdinnermainPageModule } from '../pages/lunchdinnermain/lunchdinnermain.module';
import { CulturePageModule } from '../pages/culture/culture.module';
import { FavouriteProvider } from '../providers/favourite/favourite';
import { LemakPageModule } from '../pages/lemak/lemak.module';
import { BiryaniPageModule } from '../pages/biryani/biryani.module';
import { PadangPageModule } from '../pages/padang/padang.module';
import { CurrychickenPageModule } from '../pages/currychicken/currychicken.module';
import { LormeePageModule } from '../pages/lormee/lormee.module';
import { CrabPageModule } from '../pages/crab/crab.module';
import { ChickenricePageModule } from '../pages/chickenrice/chickenrice.module';
import { KopiPageModule } from '../pages/kopi/kopi.module';
import { TehPageModule } from '../pages/teh/teh.module';
import { MiloPageModule } from '../pages/milo/milo.module';
import { BundungPageModule } from '../pages/bundung/bundung.module';
import { HaliaPageModule } from '../pages/halia/halia.module';
import { MomentModule } from 'angular2-moment';


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
    BreakfastmainPageModule,
    LunchdinnermainPageModule,
    UserPageModule,
    AngularFireDatabaseModule,
    DimsumPageModule,
    HttpModule,
    HttpClientModule,
    RotiprataPageModule,
    BeehoonPageModule,
    KayatoastPageModule,
    CulturePageModule,
    LemakPageModule,
    BiryaniPageModule,
    PadangPageModule,
    CurrychickenPageModule,
    LormeePageModule,
    CrabPageModule,
    ChickenricePageModule,
    KopiPageModule,
    TehPageModule,
    MiloPageModule,
    BundungPageModule,
    HaliaPageModule,
    MomentModule,




  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    Camera,
    ImagePicker,
    Crop,
    FirebaseService,
    LoadingController,
    AuthService,
    UserService,
    GooglePlus,

    
    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FavouriteProvider,
    FavouriteProvider,
    
  ]
})
export class AppModule {}
