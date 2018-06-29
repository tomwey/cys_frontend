import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Users } from '../provider/Users';
import { Utils } from '../provider/Utils';
import { Tools } from '../provider/Tools';
import { AppManager } from '../provider/AppManager';

// import { UserScanRedpackPage } from '../pages/user-scan-redpack/user-scan-redpack';
import { Wechat } from '../provider/Wechat';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar,
    private users: Users, 
    private tools: Tools,
    private appManager: AppManager,
    private wechat: Wechat,
    private events: Events,
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      /*
      let rid = Utils.getQueryString('rid');
      let rrid = Utils.getQueryString('rsid');
      let uid = Utils.getQueryString('uid');

      this.users.token().then(token => {
        if (!token) {
          let code = Utils.getQueryString('code');
          let provider = Utils.getQueryString('provider');
          
          if (code && provider) {
            // 绑定登录
            this.users.bindAuth(code, provider, rid)
              .then(data => {
                if (data && data.data) {
                  let token = data.data.token;
                  this.users.saveToken(token).then(() => {
                    // this.rootPage = TabsPage;
                    this.handlePageForward({ rid: rid, rrid: rrid, uid: uid });
                  });
                } else {
                  this.tools.showToast('登录失败~');
                  this.rootPage = LoginPage;
                }
              })
              .catch(error => {

              });
          } else {
            // this.tools.showToast('登录失败~');
            this.rootPage = LoginPage;
          }
        } else {
          
          this.handlePageForward({ rid: rid, rrid: rrid, uid: uid });
        }
      });*/
    });
  }

  handlePageForward(params) {
    // alert(params.rid);
    // if (!params.rid && !params.rrid && !params.uid) { // APP入口没有带参数
    //   this.rootPage = TabsPage;
    // } else {
      // 抢红包界面
      // console.log(rid);
      this.wechat.GetConfig(window.location.href)
        .then(data => {

        })
        .catch(error => {

        });

      this.appManager.shareData = params;

      if (params.rid) { // ?rid=1234 跳转到红包详情
        // this.rootPage = RedpackDetailPage;
      } else if (params.rrid) { // ?rrid=18303030 商家扫用户确认消费抵扣
        // this.rootPage = RedpackOwnerScanPage;
      } else if (params.uid) { // ?uid=4948484 用户扫商家的二维码抢红包
        // this.rootPage = UserScanRedpackPage;
      } else {
        this.rootPage = TabsPage;
      }
      
    // }
  }
}
