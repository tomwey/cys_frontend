import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RedpackThemeCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-redpack-theme-create',
  templateUrl: 'redpack-theme-create.html',
})
export class RedpackThemeCreatePage {

  image: any = null;

  positions: any = [
    {
      label: '左上',
      value: 'NorthWest'
    },
    {
      label: '中上',
      value: 'North'
    },
    {
      label: '右上',
      value: 'NorthEast'
    },
    {
      label: '左中',
      value: 'West'
    },
    {
      label: '正中',
      value: 'Center'
    },
    {
      label: '右中',
      value: 'East'
    },
    {
      label: '左下',
      value: 'SouthWest'
    },
    {
      label: '中下',
      value: 'South'
    },
    {
      label: '右下',
      value: 'SouthEast'
    },
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.image = this.navParams.data.image;
    // console.log(this.image);
  }

  ionViewDidLoad() {
    this.previewImage();
  }

  previewImage(): void {
    let fr: FileReader = new FileReader();
    fr.readAsDataURL(this.image);
    fr.onload = (e) => {
      // console.log(fr.result);

      document.getElementById('theme-image')
        .style.backgroundImage = "url(" + fr.result + ")";
    };
  }

}
