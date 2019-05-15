import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DtabsPage } from '../dtabs/dtabs';

interface deviceInterface {
  id?: string,
  platform?: string,
  version?: string,
};

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {

  details : FormGroup;
  userData = { "username": "", "email": "", "phone": "", "code": "" };
  data:any = {};
  public deviceInfo: deviceInterface = {};
  loading: any;
  public lat:number;
  public lng:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, private device: Device,  public loadingCtrl: LoadingController, public http: Http, public nativeGeocoder: NativeGeocoder,public geolocation: Geolocation) {
    this.data.addrss = '';
    this.data.response = '';
    this.data.id = this.device.uuid;
    this.data.platform = this.device.platform;
    this.data.version = this.device.version;
    this.http = http;
    
    //Get a location
    this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((resp) => {
      this.lat= resp.coords.latitude;
      this.lng= resp.coords.longitude;
      console.log(this.lat);
      console.log(this.lng);
      this.reverseGeocoding(this.lat,this.lng);
    }).catch((error) => {
       console.log('Error getting location', error);
    });
  }

  ngOnInit() {
    this.details = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
      phone: new FormControl('', [Validators.required, Validators.pattern('[+0-9]*')]),
      code: new FormControl('NULL'),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  reverseGeocoding(lat,lng){
    let options: NativeGeocoderOptions = {
      useLocale: false,
      maxResults: 2
    };
    this.nativeGeocoder.reverseGeocode(lat,lng,options)
      .then((result: NativeGeocoderReverseResult[]) =>{ 
        this.data.addrss= result[1].subLocality +","+ result[1].locality +","+
        result[1].subAdministrativeArea +","+ result[1].administrativeArea +"-"+
        result[1].postalCode +","+result[1].countryName;
        console.log(this.data.addrss);
      }).catch((error: any) => console.log(error));
  }

  showLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Please Wait...',
      duration: 3000
    });
    this.loading.present();
  }

  Submit(){
    this.showLoading();

    var link = 'http://localhost/mcx-api/Register-data.php';
    var myData = JSON.stringify({username: this.userData.username, email: this.userData.email, phone: this.userData.phone, id: this.data.id, platform: this.data.platform, version: this.data.version, add: this.data.addrss, code: this.userData.code });
    console.log(myData);
    this.http.post(link, myData)
    .subscribe(data => {
      this.data.response = data["_body"];
      console.log(this.data.response);
      const alert = this.alertCtrl.create({
        title: 'Register Successfully!',
        subTitle: 'You are logged in',
        buttons: ['OK']
      });
      this.loading.dismiss();
      alert.present();
      this.navCtrl.push(DtabsPage);
    }, error => {
      console.log("Oooops!");
    });

    var mail = 'http://mcx.fastura.net/mcx/automailmcx.php';
    this.http.post(mail, myData)
    .subscribe(data => {
      this.data.response = data["_body"]; 
    }, error => {
      console.log("Oooops!");
    });
  }
}
