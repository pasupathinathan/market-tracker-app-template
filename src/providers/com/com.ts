import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Platform, AlertController } from 'ionic-angular';

@Injectable()
export class ComProvider {

  public alertShown:boolean=false;
  showSplash = true;
  public appurl : string ='https://play.google.com/store/apps/details?id=com.fastura.mcx';
  public img : string ='https://lh3.googleusercontent.com/k_gJAa0ItrZvND7Hkq2eXhLNSjY20MahPiJrBAJ6u57-EsC3RbQe6RL0zC2dmjqgyDM=s180-rw';

  constructor(public platform: Platform, public http: HttpClient, private socialSharing: SocialSharing, public alertCtrl: AlertController) {
    console.log('Hello ComProvider Provider');
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'MCX Market Tracker',
      message: 'Do you want Exit?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.alertShown=false;
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            this.platform.exitApp();
          }
        }
      ]
    });
     alert.present().then(()=>{
      this.alertShown=true;
    });
  }

  moreShare(){
    this.socialSharing.share("MCX Market Tracker","",this.img,this.appurl).then(()=>{
    console.log("success");
    }).catch(()=>{
    console.error("failed");
    });
  }

  shareTwitter(){
    this.socialSharing.shareViaTwitter("MCX Market Tracker",this.img,this.appurl).then(()=>{
    console.log("success");
    }).catch(()=>{
    console.error("failed");
    });
  }

  shareFacebook(){
    this.socialSharing.shareViaFacebook("MCX Market Tracker","",this.appurl).then(()=>{
    console.log("success");
    }).catch(()=>{
    console.error("failed");
    });
  }

  shareWhatsapp(){
    this.socialSharing.shareViaWhatsApp("MCX Market Tracker",this.img,this.appurl).then(()=>{
    console.log("success");
    }).catch(()=>{
    console.error("failed");
    });
  }

}
