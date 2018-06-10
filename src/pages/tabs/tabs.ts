import { Component } from '@angular/core';

import { NewRedpackPage } from '../new-redpack/new-redpack';
import { RedpackListPage } from '../redpack-list/redpack-list';
import { SettingPage } from '../setting/setting';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NewRedpackPage;
  tab2Root = RedpackListPage;
  tab3Root = SettingPage;

  constructor() {

  }
}
