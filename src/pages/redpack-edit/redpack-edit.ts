import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';
import { Redpacks } from '../../provider/Redpacks';
import { Tools } from '../../provider/Tools';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the RedpackEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-redpack-edit',
  templateUrl: 'redpack-edit.html',
})
export class RedpackEditPage {

  redpack: any = {
    subject: '',
    sign_val: '',
    theme: null,
    audio: null,
  };

  updateError: any = null;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, 
    private viewCtrl: ViewController,
    private redpacks: Redpacks,
    private tools: Tools,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
      this.redpack = this.navParams.data;
      this.redpack.audio = this.navParams.data.audio_obj;
      // this.redpack.sign = this.navParams.data.sign_val;
  }

  ionViewDidLoad() {
    this.iosFixed.fixedScrollFreeze(this.content);
    // console.log('ionViewDidLoad RedpackEditPage');
  }

  close() {
    this.viewCtrl.dismiss().catch(error => {});
  }

  commit() {
    let params = {
      subject: this.redpack.subject,
      sign_val: this.redpack.sign_val,
    };
    if (this.redpack.theme) {
      params['theme_id'] = this.redpack.theme.id;
    }
    if (this.redpack.audio) {
      params['audio_id'] = this.redpack.audio.id;
    }

    this.redpacks.UpdateRedpack(this.redpack.id, params)
      .then(res => {
        if (res && res['data']) {
          // this.redpack = res['data'];
          // this.redpack.audio = this.redpack.audio_obj;
          this.tools.showToast('修改成功！');
          this.viewCtrl.dismiss(1).catch(error => {});
        } else {
          this.tools.showToast('未知原因错误');
        }
      })
      .catch(error => {
        this.updateError = error.message;
      });

  }

  selectTheme() {
    this.navCtrl.push('RedpackThemePage', this.redpack);
  }

  selectAudio() {
    this.navCtrl.push('RedpackAudioPage', this.redpack);
  }

}
