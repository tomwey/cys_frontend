import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VoteDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vote-detail',
  templateUrl: 'vote-detail.html',
})
export class VoteDetailPage {

  vote: any = null;
  voteBody: any = null;
  currentMedia: any = null;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
      this.vote = this.navParams.data;
  }

  ionViewDidLoad() {
    
  }

}
