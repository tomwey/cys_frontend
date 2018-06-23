import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MediaDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-media-detail',
  templateUrl: 'media-detail.html',
})
export class MediaDetailPage {

  media: any = null;

  error: any = null;
  comments: any = [];

  // 评论内容
  content: string = null;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
    this.media = this.navParams.data;
    // console.log(this.media);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MediaDetailPage');
    setTimeout(() => {
      this.loadComments();
    }, 100);
  }

  loadComments() {
    this.error = "暂无评论";
  }

}
