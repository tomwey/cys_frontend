import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoteDetailPage } from './vote-detail';

import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';

@NgModule({
  declarations: [
    VoteDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(VoteDetailPage),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
})
export class VoteDetailPageModule {}
