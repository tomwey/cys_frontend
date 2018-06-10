import { Component, ViewChild } from '@angular/core';
import { /*IonicPage, */NavController, NavParams, App, ModalController, AlertController, Content } from 'ionic-angular';
import { Redpacks } from '../../provider/Redpacks';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the RedpackListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-redpack-list',
  templateUrl: 'redpack-list.html',
})
export class RedpackListPage {
  redpack_type = 'taked';
  
  years: any = [];
  currentYear: string = null;

  listData: any = null;
  errorMsg: string = null;

  selectOptions: any = {
    title: '选择年份',
    // subTitle: 'Select your toppings',
  };

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, 
    private redpacks: Redpacks,
    private app: App,
    private iosFixed: iOSFixedScrollFreeze,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
    this.generateYears();
  }

  generateYears() {
    let nowYear = new Date().getFullYear();
    for(var y = nowYear; y >= 2018; y--) {
      this.years.push(`${y}年`);
    }

    this.currentYear = this.years[0];
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RedpackListPage');
    this.iosFixed.fixedScrollFreeze(this.content);

    setTimeout(() => {
      this.loadData();
    }, 50);
  }

  segmentChanged(ev) {
    this.listData = null;
    this.loadData();
  }

  loadData() {
    this.errorMsg = null;

    const year = this.currentYear.substr(0, this.currentYear.length - 1);
    // console.log(year);
    this.redpacks.GetMyRedpacks(this.redpack_type, year)
      .then(res => {
        if (res && res['data']) {
          this.listData = res['data'];
          this.errorMsg = this.listData.list.length === 0 ? '暂无数据' : null;
        }
      })
      .catch(error => {
        this.errorMsg = error.message || error;
      });
  }

  viewRedpack(item) {
    // console.log(redpack);
    let data: any = { 
      user: this.listData.user,
      redpack: item.redpack || item,
     };

    if (this.redpack_type == 'taked') {
      data['redpack_earn'] = {
        money: item.money,
        is_cash: item.redpack && item.redpack.is_cash,
        qrcode_url: item.qrcode_url,
      };
    }

    this.app.getRootNavs()[0].push('RedpackHistoryPage', data);
  }

  updateRedpack(redpack, event) {
    event.stopPropagation();

    this.modalCtrl.create('RedpackEditPage', redpack).present();
  }

  openOrClose(redpack, event) {
    event.stopPropagation();

    let action_name = redpack.in_use ? '关闭' : '打开';
    let action = redpack.in_use ? 'close' : 'open';

    this.alertCtrl.create({
      title: '红包操作提示',
      message: `您确定要${action_name}红包吗？`,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            // console.log('Buy clicked');
            this.redpacks.OperateRedpack(action, redpack.id)
              .then(res => {
                redpack.in_use = !redpack.in_use;
              })
              .catch(error => {});
          }
        }
      ]
    }).present();
  }

  yearChanged(ev) {
    // console.log(ev);
    this.loadData();
  }

}
