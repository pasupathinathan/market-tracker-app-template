import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartsPage } from './charts';


import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    ChartsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChartsPage),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
      })
  ],
})
export class ChartsPageModule {}
