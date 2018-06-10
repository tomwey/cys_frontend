import { Component, ViewChild } from '@angular/core';
import { /*IonicPage, */NavController, NavParams, App, Content, ModalController } from 'ionic-angular';
import { Redpacks } from '../../provider/Redpacks';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the NewRedpackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-new-redpack',
  templateUrl: 'new-redpack.html',
})
export class NewRedpackPage {

  use_type: number = 0;
  can_commit: boolean = false;
  createError: any = null;

  redpack: any = {
    money: '',
    quantity: '',
    subject: '',
    theme: null,
    audio: null,
    sign: '',
    // _type: 0,
    is_cash_hb: true,
  };

  // moneyRegex = /^[1-9]\d*$/;
  // quantityRegex = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, 
    private app: App,
    private modalCtrl: ModalController,
    private redpacks: Redpacks,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
  }

  // ngOnInit() {
  //   if (this.platform.is('mobileweb') && this.platform.is('ios')) {
  //     this.content.enableJsScroll()
  //   }
  // }

  ionViewDidLoad() {
    // this.fixedIOSScrollBug();
    // console.log('ionViewDidLoad NewRedpackPage');
    this.iosFixed.fixedScrollFreeze(this.content);
  }

  toggleUseType() {
    if (this.use_type == 0) {
      this.use_type = 1;
    } else {
      this.use_type = 0;
    }
  }

  calcTotalMoney() {
    // this.can_commit = this.redpack.money && this.redpack.quantity;
    
    let money = this.redpack.money || 0.00;
    let quantity = this.redpack.quantity || 0;
    if (this.use_type == 0) {
      return parseFloat(money);
    } else {
      return parseFloat(money) * quantity;
    }
  }

  inputChanged() {
    this.can_commit = (parseFloat(this.redpack.money) > 0.00 
          && parseInt(this.redpack.quantity) > 0);
  }

  // moneyChange(value) {
  //   this.cdRef.detectChanges();
  //   this.redpack.money = this.moneyRegex.test(value) ? value : this.redpack.money;
  // }

  // quantityChange(value) {
  //   this.cdRef.detectChanges();
  //   this.redpack.quantity = this.quantityRegex.test(value) ? value : this.redpack.quantity;
  // }

  selectTheme() {
    this.app.getRootNavs()[0].push('RedpackThemePage', this.redpack);
  }

  selectAudio() {
    this.app.getRootNavs()[0].push('RedpackAudioPage', this.redpack);
  }

  commit() {
    let params = {};

    params['money'] = Math.floor(parseFloat(this.redpack.money) * 100);
    params['quantity'] = this.redpack.quantity;
    params['_type'] = this.use_type;
    params['use_type'] = this.redpack.is_cash_hb ? 1 : 2;
    params['subject'] = this.redpack.subject;
    params['sign_val'] = this.redpack.sign;

    if (this.redpack.theme) {
      params['theme_id'] = this.redpack.theme.id;
    } 

    if (this.redpack.audio) {
      params['audio_id'] = this.redpack.audio.id;
    } 

    this.createError = null;

    this.redpacks.CreateRedpack(params)
      .then(res => {
        // console.log(res);
        this.resetForm();
        if (res && res['data']) {
          // this.app.getRootNavs
          this.modalCtrl.create('RedpackCreatedPage', res['data']).present();
        } else {
          this.createError = { code: -1, message: '未知错误' };
        }
      })
      .catch(error => {
        this.createError = error;
      });
  }

  previewRedpack() {
    let modal = this.modalCtrl.create('RedpackPreviewPage', this.redpack);
    modal.onDidDismiss((data) => {
      if (data === 1) {
        this.commit();
      }
    });
    modal.present();
  }

  resetForm() {
    this.redpack = {
      money: '',
      quantity: '',
      subject: '',
      theme: null,
      audio: null,
      sign: '',
      is_cash_hb: true,
    };
  }

}
