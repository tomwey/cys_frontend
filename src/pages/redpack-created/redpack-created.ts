import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, Content } from 'ionic-angular';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';
import { jsClipboard } from '../../provider/jsClipboard';

/**
 * Generated class for the RedpackCreatedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-redpack-created',
  templateUrl: 'redpack-created.html',
})
export class RedpackCreatedPage {

  redpack: any = null;
  
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, 
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private iosFixed: iOSFixedScrollFreeze,
    private jsCopy: jsClipboard,
    public navParams: NavParams) {
      this.redpack = this.navParams.data;
  }

  ionViewDidLoad() {
    this.iosFixed.fixedScrollFreeze(this.content);
    // console.log('ionViewDidLoad RedpackCreatedPage');
  }

  close() {
    this.viewCtrl.dismiss().catch(error => {});
  }

  copy() {
    this.jsCopy.copy(this.redpack.detail_url);
    
    let toast = this.toastCtrl.create({
      message: '复制成功！',
      duration: 1000
    });
    toast.present();
  }

}
