import { Component } from '@angular/core';
import { /*IonicPage, */NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MediaListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-media-list',
  templateUrl: 'media-list.html',
})
export class MediaListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MediaListPage');
  }

}
