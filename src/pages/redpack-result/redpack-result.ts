import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Content } from 'ionic-angular';
import { Redpacks } from '../../provider/Redpacks';
import { TabsPage } from '../../pages/tabs/tabs';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';
/**
 * Generated class for the RedpackResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-redpack-result',
  templateUrl: 'redpack-result.html',
})
export class RedpackResultPage {

  redpackResult: any = null;
  redpackError: any = null;
  redpack: any = null;

  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private app: App,
    private iosFixed: iOSFixedScrollFreeze,
    private redpacks: Redpacks,
  ) {
    this.redpack = this.navParams.data.redpack;
  }

  ionViewDidLoad() {
    this.iosFixed.fixedScrollFreeze(this.content);
    
    // console.log('ionViewDidLoad RedpackResultPage');
    setTimeout(() => {
      this.openRedpack();
    }, 200);
  }

  openRedpack() {
    if (!this.redpack) return;
    
    this.redpacks.OpenRedpack(this.redpack.id, 
      this.navParams.data.answer)
      .then(data => {
        if (data) {
          this.redpackResult = data['data'];
          this.redpackError = null;
        }
      })
      .catch(error => {
        this.redpackError = error;
      });
  }

  goHome() {
    this.app.getRootNavs()[0].setRoot(TabsPage);
  }

}
