import { Component } from '@angular/core';
import { /*IonicPage, */NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TopicListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-topic-list',
  templateUrl: 'topic-list.html',
})
export class TopicListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopicListPage');
  }

}
