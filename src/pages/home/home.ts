import { Component, ViewChild } from '@angular/core';
import { /*IonicPage, */NavController, NavParams, Slides, App, Content, AlertController } from 'ionic-angular';
import { ApiService } from '../../provider/api-service';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';
import { Users } from '../../provider/Users';
import { MediaListPage } from '../media-list/media-list';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  entryData: any = null;
  error: any = null;

  @ViewChild(Slides) slides: Slides;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, 
    private api: ApiService,
    private app: App,
    private users: Users,
    private alertCtrl: AlertController,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HomePage');
    // this.iosFixed.fixedScrollFreeze(this.content);

    this.loadData();
  }

  loadData() {
    this.users.token().then(token => {
      this.api.GET('entry', {token: token}, '正在加载')
      .then(data => {
        if (data && data['data']) {
          this.entryData = data['data'];

          if (this.slides) {
            this.slides.autoplayDisableOnInteraction = false;

            this.slides.ngOnDestroy();
            this.slides.initialSlide = 0;
            this.slides.update();
            this.slides.ngAfterContentInit();
          }
        }
      })
      .catch(error => {
        this.error = error;
      });
    });
    
  }

  openMoreMV() {
    this.app.getRootNavs()[0].push(MediaListPage);
  }

  openMXJJ() {
    this.alertCtrl.create({
      title: '筹备中',
      subTitle: '即将上线...',
      buttons: [
        {
          text: '确定'
        }
      ]
    }).present();
  }

  openVotes() {
    this.app.getRootNavs()[0].push('VoteListPage');
  }

  openPerformers() {
    this.app.getRootNavs()[0].push('PerformerListPage');
  }

  ionViewDidEnter() {
    if (this.slides) {
      this.slides.startAutoplay();
    }
  }

  ionViewDidLeave() {   
    if (this.slides) {
      this.slides.stopAutoplay();  
    }
  }

  vote() {
    this.app.getRootNavs()[0].push('VoteDetailPage', this.entryData.vote);
  }

  autoPlay() {
    if (this.entryData && this.entryData.banners.length > 1 && this.slides) {
      this.slides.startAutoplay();
    }

  }

  openBanner(banner) {
    // this.app.getRootNavs()[0].push('CloudZoneDetailPage', banner);
    // this.app.getRootNavs()[0].push('ArticlePage', { id: banner.ContentID });
  }

}
