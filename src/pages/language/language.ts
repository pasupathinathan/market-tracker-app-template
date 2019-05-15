import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-language',
  templateUrl: 'language.html',
})
export class LanguagePage {

  lang:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public translateService:TranslateService) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LanguagePage');
  }
  changelang(lang){
    
    this.translateService.use(this.lang);
  }
}
