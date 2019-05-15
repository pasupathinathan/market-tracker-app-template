import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RatemePage } from './rateme';

@NgModule({
  declarations: [
    RatemePage,
  ],
  imports: [
    IonicPageModule.forChild(RatemePage),
  ],
})
export class RatemePageModule {}
