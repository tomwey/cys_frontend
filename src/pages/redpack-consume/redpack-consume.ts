import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Redpacks } from '../../provider/Redpacks';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the RedpackConsumePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-redpack-consume',
  templateUrl: 'redpack-consume.html',
})
export class RedpackConsumePage {

  consume_type: string = 'confirmed';
  consumeData: any = null;

  errorMsg: string = null;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    private redpacks: Redpacks, 
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RedpackConsumePage');
    this.iosFixed.fixedScrollFreeze(this.content);
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.consumeData = null;
    this.errorMsg = null;

    this.redpacks.GetRedpackConsumes(this.consume_type)
      .then(res => {
        if (res && res['data']) {
          this.consumeData = res['data']

          let list = [];
          if (this.consumeData && this.consumeData.list) {
            list = this.consumeData.list;
          }

          this.errorMsg = list.length == 0 ? '暂无数据' : null;
        }
      })
      .catch(error => {
        this.errorMsg = error.message || error;
      });
  }

  segmentChanged(ev) {
    this.loadData();
  }

}
