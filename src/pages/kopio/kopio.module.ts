import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KopioPage } from './kopio';

@NgModule({
  declarations: [
    KopioPage,
  ],
  imports: [
    IonicPageModule.forChild(KopioPage),
  ],
})
export class KopioPageModule {}
