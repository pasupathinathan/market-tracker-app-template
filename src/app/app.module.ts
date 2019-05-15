import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device';
import { HttpModule } from '@angular/http';
//import { HttpClientModule } from '@angular/common/http';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { EmailComposer } from '@ionic-native/email-composer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Push} from '@ionic-native/push';
import { OneSignal } from '@ionic-native/onesignal';

import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { DtabsPage } from '../pages/dtabs/dtabs';
import { AccountPage } from '../pages/account/account';
import { HolidaysPage } from '../pages/holidays/holidays';
import { FaqPage } from '../pages/faq/faq';
import { RatemePage } from '../pages/rateme/rateme';
import { HelpPage } from '../pages/help/help';
import { AboutPage } from '../pages/about/about';
import { NetPage } from '../pages/net/net';
import { LanguagePage } from '../pages/language/language';


import { ComProvider } from '../providers/com/com';
import { SubscribePage } from '../pages/subscribe/subscribe';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    DtabsPage,
    AccountPage,
    HolidaysPage,
    FaqPage,
    RatemePage,
    HelpPage,
    AboutPage,
    NetPage,
    SubscribePage,
    LanguagePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
      })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    DtabsPage,
    AccountPage,
    HolidaysPage,
    FaqPage,
    RatemePage,
    HelpPage,
    AboutPage,
    NetPage,
    SubscribePage,
    LanguagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Device,
    InAppBrowser,
    EmailComposer,
    SocialSharing,
    Geolocation,
    NativeGeocoder,
    Push,
    OneSignal,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ComProvider
  ]
})
export class AppModule {}
