import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Redpacks } from '../../provider/Redpacks';
import { AudioProvider } from 'ionic-audio';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the RedpackAudioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-redpack-audio',
  templateUrl: 'redpack-audio.html',
})
export class RedpackAudioPage {

  audio_type: string = 'common';
  
  catalogs: any = [];
  commonData: any = [];
  selectedCatalogIndex: number = 0;

  redpack: any = null;

  myTracks: any[];
  allTracks: any[];

  @ViewChild(Content) content: Content;
  
  constructor(public navCtrl: NavController, 
    private redpacks: Redpacks,
    private _audioProvider: AudioProvider,
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

  ngAfterContentInit() {     
    // get all tracks managed by AudioProvider so we can control playback via the API
    this.allTracks = this._audioProvider.tracks; 
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

  selectItem(index) {
    this.redpack.audio = this.commonData[index];
  }

  ok() {
    this.navCtrl.pop();
  }

  ionViewWillLeave() {
    this._audioProvider.stop();
  }

  loadData() {
    if (this.selectedCatalogIndex >= this.catalogs.length) {
      return;
    }

    let catalog = this.catalogs[this.selectedCatalogIndex];

    this.redpacks.GetRedpackAudios(catalog.id)
      .then(res => {
        if (res && res['data']) {
          this.commonData = res['data'];

          this.myTracks = [];

          this.commonData.forEach(item => {
            this.myTracks.push(
              {
                src: item.file,
                artist: '',
                title: item.name,
                art: '',
                preload: 'metadata'
              }
            );
          });
        }
      })
      .catch(error => {

      });
  }

  selectCatalog(index) {
    this.selectedCatalogIndex = index;
    this.loadData();
  }
         
  onTrackFinished(track: any) {
    // console.log('Track finished', track)
  }

  segmentChanged(ev) {

  }

}
