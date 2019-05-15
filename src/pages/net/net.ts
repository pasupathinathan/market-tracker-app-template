import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-net',
  templateUrl: 'net.html',
})
export class NetPage {

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NetPage');
  }
  exit(){
    this.platform.exitApp();
  }
}
