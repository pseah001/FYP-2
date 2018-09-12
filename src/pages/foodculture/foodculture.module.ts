import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodculturePage } from './foodculture';

@NgModule({
  declarations: [
    FoodculturePage,
  ],
  imports: [
    IonicPageModule.forChild(FoodculturePage),
  ],
})
export class FoodculturePageModule {}
