import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer';
import { Device } from '@ionic-native/device';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


import { DtabsPage } from '../pages/dtabs/dtabs';
import { RegisterPage } from '../pages/register/register';
import { AccountPage } from '../pages/account/account';
import { HolidaysPage } from '../pages/holidays/holidays';
import { FaqPage } from '../pages/faq/faq';
import { RatemePage } from '../pages/rateme/rateme';
import { HelpPage } from '../pages/help/help';
import { AboutPage } from '../pages/about/about';
import { NetPage } from '../pages/net/net';

import { ComProvider } from '../providers/com/com';
import { SubscribePage } from '../pages/subscribe/subscribe';

import { TranslateService } from '@ngx-translate/core';
import { LanguagePage } from '../pages/language/language';

declare var navigator: any;
declare var Connection: any;

interface deviceInterface {
  id?: string
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = DtabsPage;
  public deviceInfo: deviceInterface = {};
  data:any = {};
  public items:any = {};
  loading: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,  public statusBar: StatusBar, public splashScreen: SplashScreen, public com: ComProvider, public device: Device, public http: Http, public loadingCtrl: LoadingController, public translate: TranslateService) {
    this.data.id = this.device.uuid;
    this.http = http;

    //this.showLoading();
    //this.checkNetwork();
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    //Exit Screen display
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      timer(3000).subscribe(()=>this.com.showSplash=false)
       platform.registerBackButtonAction(() => {
       if (this.com.alertShown==false) {
         this.com.presentConfirm();  
        }
      }, 0)
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'HOME', component: DtabsPage },
      { title: 'ACCOUNT', component: AccountPage },
      { title: 'HOLIDAYS', component: HolidaysPage },
      { title: 'FAQ', component: FaqPage },
      { title: 'RATE ME', component: RatemePage },
      { title: 'HELP', component: HelpPage },
      { title: 'ABOUT US', component: AboutPage },
      {title:'LANGUAGE', component:LanguagePage},
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  showLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    this.loading.present();
  }

  

  checkNetwork() {
    //this.showLoading();
    this.platform.ready().then(() => {
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.NONE]     = 'No Network Connection';
        if(states[networkState]=='No Network Connection'){
          this.loading.dismiss();
          this.rootPage=NetPage;
        }else{
          var link = 'http://mcx.fastura.net/mcx/Device-data.php';
          var myData = JSON.stringify({id: this.data.id});
          console.dir(myData);
          this.http.post(link, myData).map(res => res.json())
          .subscribe((data : any) =>
          {
            console.dir(data);
            this.items = data;
            if(this.items==this.data.id){
              this.loading.dismiss();
              this.rootPage=DtabsPage;
            }
            else{
              this.loading.dismiss();
              this.rootPage=RegisterPage;
            }
          }, error => {
          console.log("Oooops!");
          });
        }
    });
  }
}
