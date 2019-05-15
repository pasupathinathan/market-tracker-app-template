import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-calls',
  templateUrl: 'calls.html',
})
export class CallsPage {

  public items:Array<any>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    //this.http= http;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CallsPage');
    this.calls();
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    
    setTimeout(() => {
      console.log('Async operation has ended');
      this.calls();
      refresher.complete();
    }, 1000);
  }

  calls(){
    this.http
    .get('http://mcx.fastura.net/mcx/Calls-data.php')
    .subscribe((data : any) =>
    {
       console.dir(data);
       this.items = data;
    }, error => {
    console.log("Oooops!");
    });
  }
}
