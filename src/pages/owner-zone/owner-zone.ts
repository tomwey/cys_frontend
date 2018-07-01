import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OwnerZonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-owner-zone',
  templateUrl: 'owner-zone.html',
})
export class OwnerZonePage {

  owner: any = null;
  ownerType: string = null;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.owner = this.navParams.data.owner;
    this.ownerType = this.navParams.data.ownerType;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OwnerZonePage');
  }

}
