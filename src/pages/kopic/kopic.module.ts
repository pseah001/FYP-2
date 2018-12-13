import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KopicPage } from './kopic';

@NgModule({
  declarations: [
    KopicPage,
  ],
  imports: [
    IonicPageModule.forChild(KopicPage),
  ],
})
export class KopicPageModule {}
