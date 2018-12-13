import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrabPage } from './crab';

@NgModule({
  declarations: [
    CrabPage,
  ],
  imports: [
    IonicPageModule.forChild(CrabPage),
  ],
})
export class CrabPageModule {}
