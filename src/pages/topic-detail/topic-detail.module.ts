import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopicDetailPage } from './topic-detail';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    TopicDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TopicDetailPage),
    PipesModule,
  ],
})
export class TopicDetailPageModule {}
