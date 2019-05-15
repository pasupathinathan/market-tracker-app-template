import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { ComProvider } from '../../providers/com/com';

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {

  subject='';
  body='';
  to=''

  constructor(public navCtrl: NavController, public navParams: NavParams, public emailComposer: EmailComposer, private com: ComProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }
  sendmail(){
    let email ={
    to: 'supportteam@fastura.com',
    cc:[],
    bcc:[],
    attachment:[],
    subject:this.subject,
    body:this.body,
    ishtml:true,
    app:"Gmail"
    }
    this.emailComposer.open(email);
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
