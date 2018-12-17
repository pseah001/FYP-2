import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MiloPage } from './milo';

@NgModule({
  declarations: [
    MiloPage,
  ],
  imports: [
    IonicPageModule.forChild(MiloPage),
  ],
})
export class MiloPageModule {}
