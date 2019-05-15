import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Device } from '@ionic-native/device';
import 'rxjs/add/operator/map';

import { ComProvider } from '../../providers/com/com';

interface deviceInterface {
  id?: string,
};

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  public items:Array<any>=[];
  data:any = {};
  public deviceInfo: deviceInterface = {};

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public http: Http, private device: Device, private com: ComProvider) {
    this.http = http;
    this.data.id = this.device.uuid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    this.details();
  }
  details() {
    var link = 'http://mcx.fastura.net/mcx/Account-data.php';
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
  TabsPage(){
  	this.platform.exitApp();
  }
  shareFB(){
    this.com.shareFacebook();
  }
  sharewap(){
    this.com.shareWhatsapp();
  }
  sharetwit(){
    this.com.shareTwitter();
  }
  moreshare(){
    this.com.moreShare();
  }
}
