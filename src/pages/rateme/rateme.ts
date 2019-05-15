import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ComProvider } from '../../providers/com/com';

@IonicPage()
@Component({
  selector: 'page-rateme',
  templateUrl: 'rateme.html',
})
export class RatemePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public iap: InAppBrowser, private com: ComProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatemePage');
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
