import { Component, ViewChild, Renderer, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController } from 'ionic-angular';
import { Redpacks } from '../../provider/Redpacks';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the RedpackThemePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-redpack-theme',
  templateUrl: 'redpack-theme.html',
})
export class RedpackThemePage {

  theme_type: string = 'common';

  catalogs: any = [];
  commonData: any = [];
  selectedCatalogIndex: number = 0;

  redpack: any = null;

  @ViewChild(Content) content: Content;

  @ViewChild('fileInput') nativeFileInputBtn: ElementRef;

  constructor(public navCtrl: NavController, 
    private redpacks: Redpacks,
    // private platform: Platform,
    private renderer: Renderer, 
    private alertCtrl: AlertController,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
      this.redpack = this.navParams.data;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RedpackThemePage');

    this.iosFixed.fixedScrollFreeze(this.content);
    
    setTimeout(() => {
      this.loadCatalogs();
    }, 200);
  }

  loadCatalogs() {
    this.redpacks.GetCatalogs()
      .then(res => {
        if (res && res['data']) {
          this.catalogs = res['data'];

          this.loadData();
        }
      })
      .catch(error => {

      })
  }

  selectItem(item) {
    // console.log(item);
    // this.selectedItem = item;
    this.redpack.theme = item;
  }

  ok() {
    this.navCtrl.pop();
  }

  loadData() {
    if (this.selectedCatalogIndex >= this.catalogs.length) {
      return;
    }
    let catalog = this.catalogs[this.selectedCatalogIndex];
    this.loadThemes(catalog.id);
  }

  loadThemes(cid) {
    this.redpacks.GetRedpackThemes(cid)
    .then(res => {
      if (res && res['data']) {
        this.commonData = res['data'];

        this.redpack.theme = this.redpack.theme || this.commonData[0];
        // this.selectedItem = this.commonData[0];
      }
    })
    .catch(error => {

    });
  }

  selectCatalog(index) {
    this.selectedCatalogIndex = index;
    this.loadData();
  }

  segmentChanged(ev) {
    if (this.theme_type === 'custom') {
      this.loadMyThemes();
    } 
  }

  loadMyThemes() {

  }

  selectImage() {
    let clickEvent: MouseEvent = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      this.nativeFileInputBtn.nativeElement, "dispatchEvent", [clickEvent]
    );
  }

  selectedFiles(ev) {
    let files: FileList = this.nativeFileInputBtn.nativeElement.files;
    // console.log(files);
    // console.log(event);
    if (files.length == 0) return;

    let imageFile = files[0];

    if (!this.isImageType(imageFile)) {
      let alert = this.alertCtrl.create({
        title: '图片格式错误',
        subTitle: '不正确的图片格式，仅支持png,jpg,gif类型的图片',
        buttons: ['确定']
      });
      alert.present();
      return;
    }

    this.navCtrl.push('RedpackThemeCreatePage', { image: imageFile });
  }

  isImageType(file: File): boolean {
    let ext: any = ['image/png', 'image/jpeg', 'image/gif'];
    let fileType = file.type;
    return ext.indexOf(fileType) !== -1;
  }

}
