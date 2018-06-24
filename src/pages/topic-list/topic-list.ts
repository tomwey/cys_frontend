import { Component } from '@angular/core';
import { /*IonicPage, */NavController, NavParams, ModalController } from 'ionic-angular';
import { Media } from '../../provider/Media';
import { Tools } from '../../provider/Tools';

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

  // 分页
  pageNum: number = 1;
  totalPage: number = 1;
  pageSize: number = 20;
  
  // 加载数据
  error: any = null;
  topics: any = [];
  
  hasMore: boolean = false;

  dataType: string = 'latest';

  constructor(public navCtrl: NavController, 
    private media: Media,
    private tools: Tools,
    private modalCtrl: ModalController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad TopicListPage');
    setTimeout(() => {
      this.loadData();
    }, 20);
  }

  selectItem(type) {
    this.dataType = type;

    this.error = null;
    this.topics = [];

    this.pageNum = 1;
    this.totalPage = 1;
    this.hasMore = false;

    this.loadData();
  }

  loadData() {
    return new Promise((resolve) => {
      this.media.GetTopic(this.dataType, this.pageNum, this.pageSize)
        .then(res => {
          const data = res['data'];
          const total = res['total'];

          if (this.pageNum === 1) {
            this.topics = data;
            if (this.topics.length == 0) {
              this.error = "暂无动态";
            } else {
              this.error = null;
            }
          } else {
            let temp = this.topics || [];
            this.topics = temp.concat(data);
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

  newTopic() {
    let modal = this.modalCtrl.create('NewTopicPage');
    modal.onDidDismiss((data) => {
      if (data) {
        this.selectItem(this.dataType);
      }
    });
    modal.present();
  }

  loadMore(e) {
    if (this.pageNum < this.totalPage) {
      this.pageNum ++;

      this.loadData().then(() => {
        e.complete();
      });
    }
  }

}
