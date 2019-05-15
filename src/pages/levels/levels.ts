import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-levels',
  templateUrl: 'levels.html',
})
export class LevelsPage {

  public items:Array<any>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LevelsPage');
    this.levels();
  }
  levels(){
    this.http
    .get('http://mcx.fastura.net/mcx/Levels-data.php')
    .subscribe((data : any) =>
    {
       console.dir(data);
       this.items = data;
    }, error => {
    console.log("Oooops!");
    });
  }
}
