import { Component, ViewChild } from '@angular/core';
import { /*IonicPage,*/ NavController, NavParams, App, AlertController, Events, ModalController, Content } from 'ionic-angular';
import { Users } from '../../provider/Users';
import { LoginPage } from '../../pages/login/login';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  user: any = null;
  error: any = null;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, 
    private users: Users,
    private app: App,
    private events: Events,
    private iosFixed: iOSFixedScrollFreeze,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {

    this.iosFixed.fixedScrollFreeze(this.content);

    this.events.subscribe('user:reload', () => {
      this.loadUserData();
    });
    // console.log('ionViewDidLoad SettingPage');
    this.loadUserData();
  }

  logout() {
    this.alertCtrl.create({
      title: '退出登录',
      subTitle: '您确定要退出登录吗？',
      buttons: [
        {
          text: '取消',
          role: 'Cancel',
        },
        {
          text: '确定',
          handler: () => {
            this.doLogout();
          }
        }
      ]
    }).present();
  }

  doLogout() {
    this.users.logout().then(() => {
      // this.events.publish('user:logout');
      setTimeout(() => {
        this.app.getRootNavs()[0].setRoot(LoginPage);
      }, 10);
      
    })
    .catch(errror => {});
  }

  loadUserData() {
    this.users.GetUserProfile()
      .then(res => {
        this.user = res['data'];
      })
      .catch(error => {
        this.error = error;
      });
  }

  gotoProfile() {
    this.app.getRootNavs()[0].push('UserProfilePage', this.user);
  }

  charge() {
    let modal = this.modalCtrl.create('ChargePage');
    modal.onDidDismiss((data) => {
      if (data) {
        this.loadUserData();
      };
    })
    modal.present();
  }

  gotoWallet() {
    this.app.getRootNavs()[0].push('WalletPage');
  }

  gotoPayMoney() {
    this.app.getRootNavs()[0].push('RedpackConsumePage');
  }

  newVIP() {
    this.alertCtrl.create({
      title: '即将上线',
      message: '',
      buttons: [
        {
          text: '确定',
          role: '',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    }).present();
  }

  openPage(title, slug) {
    this.app.getRootNavs()[0].push('BrowserPage', {
      title: title,
      slug: slug
    });
  }

}
