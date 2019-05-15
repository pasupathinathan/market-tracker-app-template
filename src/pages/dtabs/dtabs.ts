import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { OneSignal } from '@ionic-native/onesignal';
import { ComProvider } from '../../providers/com/com';

interface deviceInterface {
  id?: string
};

@IonicPage()
@Component({
  selector: 'page-dtabs',
  templateUrl: 'dtabs.html'
})
export class DtabsPage {

  public items:Array<any>=[];
  public data:any = {};
  public deviceInfo: deviceInterface = {};
  public myDate: any = new Date().toISOString();

  reportRoot = 'ReportPage';
  callsRoot = 'CallsPage';
  levelsRoot = 'LevelsPage';
  newsRoot = 'NewsPage';
  chartsRoot = 'ChartsPage';
  calendarRoot = 'CalendarPage';

  constructor(public navCtrl: NavController, public oneSignal: OneSignal, private device: Device, public http: Http, private com: ComProvider) {
    this.data.id = this.device.uuid;
    this.http = http;
    //this.expiredpage();
    //this.oneSignalapp();
  }
  expiredpage() {
    var link = 'http://mcx.fastura.net/mcx/Subscribe-data.php';
    var myData = JSON.stringify({id: this.data.id});
    this.http.post(link, myData).map(res => res.json())
    .subscribe((data : any) =>
    {
       console.dir(data);
       console.dir(this.myDate);
       this.items = data;
       if(this.items <= this.myDate){
        this.callsRoot = 'SubscribePage';
        this.levelsRoot = 'SubscribePage';
        this.reportRoot = 'ReportPage';
        this.newsRoot = 'NewsPage';
        this.chartsRoot = 'ChartsPage';
        this.calendarRoot = 'CalendarPage';
      }
      else{
        this.callsRoot = 'CallsPage';
        this.levelsRoot = 'LevelsPage';
        this.reportRoot = 'ReportPage';
        this.newsRoot = 'NewsPage';
        this.chartsRoot = 'ChartsPage';
        this.calendarRoot = 'CalendarPage';
      }
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

  oneSignalapp(){
    this.oneSignal.startInit('e41017af-0992-4d1b-9bfa-6155d3f2248f', '811876770665');
  
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
  
    this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when notification is received
      });
  
    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
      });
  
    this.oneSignal.endInit();
    }
}
