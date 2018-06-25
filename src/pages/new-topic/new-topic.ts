import { Component, Renderer, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('fileInput') fileInput: ElementRef;
  // @ViewChild('movInput') movInput: ElementRef;

  assets: any = [];
  assetType: number = 0; // 0 表示图片 1 表示录音 2 表示视频

  constructor(public navCtrl: NavController, 
    private media: Media,
    private tools: Tools,
    private renderer: Renderer,
    // private movRenderer: Renderer,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad NewTopicPage');
  }

  send() {
    let arr = [];
    for (var i=0; i<this.assets.length; i++) {
      if (i !== this.assets.length - 1) {
        arr.push(this.assets[i]);
      }
    }
    console.log(arr);
    
    this.media.CreateTopic(this.content, this.assetType + 1, arr)
      .then(res => {
        this.content = '';
        this.tools.showToast('发布成功！');
        this.viewCtrl.dismiss(1).catch();
      })
      .catch(error => {
        this.tools.showToast(error.message || '发布失败');

      });
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

  uploadFile(type) {
    this.assetType = type;

    if (type != 0) {
      this.assets = [];
    }

    let clickEvent: MouseEvent = new MouseEvent('click', { bubbles: true });
    // console.log(this.renderer);

    this.renderer.invokeElementMethod(
      this.fileInput.nativeElement, "dispatchEvent", [clickEvent]
    );
  }

  remove(asset) {
    const index = this.assets.indexOf(asset);
    this.assets.splice(index, 1);
  }

  readFile(file): Promise<any> {
    return new Promise((resolve, reject) => {
      let fr: FileReader = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = (e) => {
          resolve(fr.result);
      };
      fr.onerror = (err) => reject(err);
    });
    
  }

  selectedFiles(ev) {
    let files: FileList = this.fileInput.nativeElement.files;
    // console.log(files);
    // console.log(ev);
    if (files.length == 0) return;

    if (this.assetType > 0) {
      if (files.length > 1) {
        let alert = this.alertCtrl.create({
          title: '多文件不支持',
          subTitle: '视频或录音只支持选择一个',
          buttons: ['确定']
        });
        alert.present();
        return;
      }
    } 

    let fileArr: any = [];
    let promises: any = [];
    for (var i=0; i<files.length; i++) {
      // fileArr.push(files[i]);
      let file = files[i];

      promises.push(
        this.readFile(file)
        .then(url => {
          file['fileURL'] = url;
          fileArr.push(file);
        })
        .catch(error => {})
      );

      if (this.assetType == 0) {
        if (!this.isImageFile(file)) {
          let alert = this.alertCtrl.create({
            title: '图片格式错误',
            subTitle: '不正确的图片格式，仅支持png,jpg,gif类型的图片',
            buttons: ['确定']
          });
          alert.present();
          return;
        }
      } else if (this.assetType == 2) {
        if (!this.isMovieFile(file)) {
          let alert = this.alertCtrl.create({
            title: '视频格式错误',
            subTitle: '不正确的视频格式，仅支持mp4,mov,m4v类型的视频',
            buttons: ['确定']
          });
          alert.present();
          return;
        }
      } else if (this.assetType == 1) {
        if (!this.isAudioFile(file)) {
          let alert = this.alertCtrl.create({
            title: '录音格式错误',
            subTitle: '不正确的录音格式，仅支持mp3,acc,wav类型的音频',
            buttons: ['确定']
          });
          alert.present();
          return;
        }
      }
      
    }

    Promise.all(promises).then(() => {
      let temp = this.assets || [];
      // console.log(temp);
      const index = temp.indexOf('eof');
      if (index != -1) {
        temp.splice(index, 1);
      }

      this.assets = temp.concat(fileArr);
      // console.log(this.assets);

      if (this.assetType == 0) {
        this.assets.push('eof');
      }
    });
  }

  isImageFile(file: File): boolean {
    let ext: any = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    let fileType = file.type;
    return ext.indexOf(fileType) !== -1;
  }

  isMovieFile(file: File): boolean {
    let ext: any = ['video/mp4', 'video/mov', 'video/m4v'];
    let fileType = file.type;
    return ext.indexOf(fileType) !== -1;
  }

  isAudioFile(file: File): boolean {
    let ext: any = ['audio/mp3', 'audio/wav', 'audio/acc'];
    let fileType = file.type;
    return ext.indexOf(fileType) !== -1;
  }

}
