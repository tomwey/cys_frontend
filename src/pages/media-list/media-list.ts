import { Component, ViewChild } from '@angular/core';
import { /*IonicPage, */NavController, NavParams, Content } from 'ionic-angular';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';
import { Media } from '../../provider/Media';
import { Tools } from '../../provider/Tools';
import { VgAPI } from 'videogular2/core';

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

  dataType: string = 'latest';

  // 分页
  pageNum: number = 1;
  totalPage: number = 1;
  pageSize: number = 20;

  // 加载数据
  error: any = null;
  mediaData: any = [];

  hasMore: boolean = false;

  currentMedia: any = null;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, 
    private iosFixed: iOSFixedScrollFreeze,
    private media: Media,
    private tools: Tools,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  selectItem(type) {
    this.dataType = type;
    this.pageNum = 1;
    this.totalPage = 1;
    this.mediaData = [];
    
    if (this.currentMedia) {
      this.currentMedia.pause();
      this.currentMedia = null;
    }

    this.loadData();
  }

  loadData() {
    return new Promise((resolve) => {
      this.media.GetMedia(this.dataType, null, this.pageNum, this.pageSize)
        .then(res => {
          const data = res['data'];
          const total = res['total'];

          if (this.pageNum === 1) {
            this.mediaData = data;
            if (this.mediaData.length == 0) {
              this.error = "暂无数据";
            } else {
              this.error = null;
            }
          } else {
            let temp = this.mediaData || [];
            this.mediaData = temp.concat(data);
            this.error = null;
          }

          this.totalPage = (total + this.pageSize - 1) / this.pageSize;
          
          // this.totalPage = Math.floor((data.total + this.pageSize - 1) / this.pageSize); 
          this.hasMore = this.totalPage > this.pageNum;

          resolve(true);
        })
        .catch(error => {
          if (this.pageNum == 1) {
            this.error = error;
          } else {
            this.error = null;
            this.tools.showToast(error.message || error);
          }
          resolve(false);
        });
    });
  }

  loadMore(e) {
    if (this.pageNum < this.totalPage) {
      this.pageNum ++;

      this.loadData().then(() => {
        e.complete();
      });
    }
  }

  selectMedia(media) {

  }

  onPlayerReady(api: VgAPI) {
    api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
          // Set the video to the beginning
          api.getDefaultMedia().currentTime = 0;
      }
    );
  }

}
