import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DtabsPage } from './dtabs';

@NgModule({
  declarations: [
    DtabsPage,
  ],
  imports: [
    IonicPageModule.forChild(DtabsPage),
  ]
})
export class DtabsPageModule {}
