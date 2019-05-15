import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ComProvider } from '../../providers/com/com';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  public items:Array<any>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,private com: ComProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
    this.about();
  }
  about(){
    this.http
    .get('http://mcx.fastura.net/mcx/About-data.php')
    .subscribe((data : any) =>
    {
       console.dir(data);
       this.items = data;
    }, error => {
    console.log("Oooops!");
    });
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
