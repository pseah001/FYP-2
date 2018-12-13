import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LormeePage } from './lormee';

@NgModule({
  declarations: [
    LormeePage,
  ],
  imports: [
    IonicPageModule.forChild(LormeePage),
  ],
})
export class LormeePageModule {}
