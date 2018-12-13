import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChickenricePage } from './chickenrice';

@NgModule({
  declarations: [
    ChickenricePage,
  ],
  imports: [
    IonicPageModule.forChild(ChickenricePage),
  ],
})
export class ChickenricePageModule {}
