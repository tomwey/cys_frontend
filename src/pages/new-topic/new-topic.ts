import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Media } from '../../provider/Media';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the NewTopicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-topic',
  templateUrl: 'new-topic.html',
})
export class NewTopicPage {
  content: string = '';
  constructor(public navCtrl: NavController, 
    private media: Media,
    private tools: Tools,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad NewTopicPage');
  }

  send() {

  }

  close() {
    this.alertCtrl.create({
      title: '退出此次编辑吗？',
      subTitle: '',
      buttons: [
        {
          text: '取消',
          role: 'Cancel'
        },
        {
          text: '确定',
          handler: () => {
            this.viewCtrl.dismiss().catch();
          }
        }
      ]
    })
    
  }

}
