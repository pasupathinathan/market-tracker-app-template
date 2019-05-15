import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { timer } from 'rxjs/observable/timer';
import { InAppBrowser,InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { Http } from '@angular/http';
import { Device } from '@ionic-native/device';
import 'rxjs/add/operator/map';

import { AccountPage } from '../account/account';

interface deviceInterface {
  id?: string,
};

@IonicPage()
@Component({
  selector: 'page-subscribe',
  templateUrl: 'subscribe.html',
})
export class SubscribePage {
  items:any={};
  data:any = {};
  public deviceInfo: deviceInterface = {};

  public surl:string="http://mcx.fastura.net/mcx/success.php";
  public furl:string="http://mcx.fastura.net/mcx/failure.php";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public iab:InAppBrowser,
              public http: Http,
              private device: Device) {
      this.http = http;
      this.data.id = this.device.uuid;

      this.trail();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscribePage');
  }

  trail() {
    var link = 'http://localhost/mcx-api/Trail-data.php';
    var myData = JSON.stringify({id: this.data.id});
    console.log(myData);
    this.http.post(link, myData).map(res => res.json())
    .subscribe((data : any) =>
    {
       console.dir(data);
       this.items = data;
    }, error => {
    console.log("Oooops!");
    });
  }

  d(){
    const browser=this.iab.create("http://mcx.fastura.net/mcx/mcxmobile.php","_self",{
      location:'no',
      clearcache:'yes',
      hardwareback:'no',
    });
    browser.on('loadstart').subscribe((event:InAppBrowserEvent)=>{
      if(event.url===this.surl){
       timer(3000).subscribe(()=> browser.close())
        this.navCtrl.setRoot(AccountPage);
      }
      else if(event.url===this.furl){
       timer(3000).subscribe(()=> browser.close())
       this.navCtrl.setRoot(AccountPage);
      }
    });
  }
}
