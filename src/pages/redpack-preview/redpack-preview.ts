import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';
import { Redpacks } from '../../provider/Redpacks';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the RedpackPreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-redpack-preview',
  templateUrl: 'redpack-preview.html',
})
export class RedpackPreviewPage {

  preview: any = null;
  imgLoaded: boolean = false;

  redpack: any = null;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, 
    private viewCtrl: ViewController,
    private redpacks: Redpacks,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
      this.redpack = this.navParams.data;
  }

  ionViewDidLoad() {
    this.iosFixed.fixedScrollFreeze(this.content);
    // console.log('ionViewDidLoad RedpackPreviewPage');
  }

  ionViewWillEnter() {
    this.startPreview();
  }

  // redpack: any = {
  //   money: '',
  //   quantity: '',
  //   subject: '',
  //   theme: null,
  //   audio: null,
  //   sign: '',
  //   // _type: 0,
  //   is_cash_hb: true,
  // };

  startPreview() {
    if (!this.redpack) return;
    let theme_id = null;
    if (this.redpack.theme) {
      theme_id = this.redpack.theme.id;
    }

    let audio_id = null;
    if (this.redpack.audio) {
      audio_id = this.redpack.audio.id;
    }

    this.redpacks.PreviewRedpack(this.redpack.subject,theme_id,audio_id)
      .then(res => {
        if (res) {
          this.preview = res['data'];
        }
      })
      .catch(error => {

      });
  }

  usePreview() {
    if (!this.preview) return;

    this.redpacks.PreviewRedpackUse(this.preview.id)
      .then(res => {

      })
      .catch(error => {
        
      });
  }

  close() {
    this.viewCtrl.dismiss().catch();
  }

  confirm() {
    this.usePreview();
    this.viewCtrl.dismiss(1).catch();
  }

}
