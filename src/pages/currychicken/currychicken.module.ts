import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrychickenPage } from './currychicken';

@NgModule({
  declarations: [
    CurrychickenPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrychickenPage),
  ],
})
export class CurrychickenPageModule {}
