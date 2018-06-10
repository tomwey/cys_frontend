import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RedpackAudioPage } from './redpack-audio';

import { IonicAudioModule, WebAudioProvider, CordovaMediaProvider, defaultAudioProviderFactory } from 'ionic-audio';

export function myCustomAudioProviderFactory() {
  return (window.hasOwnProperty('cordova')) ? new CordovaMediaProvider() : new WebAudioProvider();
}

@NgModule({
  declarations: [
    RedpackAudioPage,
  ],
  imports: [
    IonicPageModule.forChild(RedpackAudioPage),
    IonicAudioModule.forRoot(defaultAudioProviderFactory)
  ],
})
export class RedpackAudioPageModule {}
