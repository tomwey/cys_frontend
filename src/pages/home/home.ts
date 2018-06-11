import { Component, ViewChild } from '@angular/core';
import { /*IonicPage, */NavController, NavParams, Slides, App, Content } from 'ionic-angular';
import { ApiService } from '../../provider/api-service';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

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
    // private app: App,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HomePage');
    this.iosFixed.fixedScrollFreeze(this.content);

    this.loadData();
  }

  loadData() {
    this.api.GET('entry', null, '正在加载')
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
