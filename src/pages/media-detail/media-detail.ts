import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Media } from '../../provider/Media';
import { Tools } from '../../provider/Tools';

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
    private mediaServ: Media,
    private tools: Tools,
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

  like(ev, media) {
    if (media.liked) {
      // 取消喜欢
      this.mediaServ.DeleteLike(media.id)
        .then(res => {
          media.liked = false;
          let likesCount = media.likes_count;
          likesCount -= 1;
          if (likesCount < 0) {
            likesCount = 0;
          }
          media.likes_count = likesCount;
        })
        .catch(error => {
          this.tools.showToast(error.message || '服务器出错');
          
        });
    } else {
      // 添加喜欢
      this.mediaServ.CreateLike(media.id)
        .then(res => {
          media.liked = true;
          media.likes_count += 1;
        })
        .catch(error => {
          this.tools.showToast(error.message || '服务器出错');
        });
    }
  }

}
