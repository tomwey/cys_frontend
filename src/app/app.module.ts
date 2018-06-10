import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { RedpackDetailPage } from '../pages/redpack-detail/redpack-detail';
import { LoginPage } from '../pages/login/login';
import { NewRedpackPage } from '../pages/new-redpack/new-redpack';
import { RedpackListPage } from '../pages/redpack-list/redpack-list';
import { SettingPage } from '../pages/setting/setting';
import { TabsPage } from '../pages/tabs/tabs';

import { RedpackOwnerScanPage} from '../pages/redpack-owner-scan/redpack-owner-scan';
import { UserScanRedpackPage } from '../pages/user-scan-redpack/user-scan-redpack';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Utils } from '../provider/Utils';
import { Tools } from '../provider/Tools';
import { Users } from '../provider/Users';
import { ApiService } from '../provider/api-service';
import { AppManager } from '../provider/AppManager';
import { Redpacks } from '../provider/Redpacks';
import { Pays } from '../provider/Pays';
import { Wechat } from '../provider/Wechat';
import { iOSFixedScrollFreeze } from '../provider/iOSFixedScrollFreeze';
import { jsClipboard } from '../provider/jsClipboard';
// import { APIs } from '../provider/APIs';
// import { ApiService } from '../provider/api-service';

@NgModule({
  declarations: [
    MyApp,
    NewRedpackPage,
    RedpackDetailPage,
    RedpackListPage,
    SettingPage,
    TabsPage,
    LoginPage,
    RedpackOwnerScanPage,
    UserScanRedpackPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      backButtonText: '',
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewRedpackPage,
    RedpackListPage,
    RedpackDetailPage,
    SettingPage,
    TabsPage,
    LoginPage,
    RedpackOwnerScanPage,
    UserScanRedpackPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Utils,
    // APIs,
    Tools,
    // ApiService,
    Users,
    ApiService,
    AppManager,
    Redpacks,
    Pays,
    Wechat,
    iOSFixedScrollFreeze,
    jsClipboard,
  ]
})
export class AppModule {}
