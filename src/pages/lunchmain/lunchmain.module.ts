import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LunchmainPage } from './lunchmain';

@NgModule({
  declarations: [
    LunchmainPage,
  ],
  imports: [
    IonicPageModule.forChild(LunchmainPage),
  ],
})
export class LunchmainPageModule {}
