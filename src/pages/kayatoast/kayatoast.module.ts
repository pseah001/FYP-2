import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KayatoastPage } from './kayatoast';


@NgModule({
  declarations: [
    KayatoastPage,
  ],
  imports: [
    IonicPageModule.forChild(KayatoastPage),
  ],
})
export class KayatoastPageModule {}
