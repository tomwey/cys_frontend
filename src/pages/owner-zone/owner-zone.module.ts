import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnerZonePage } from './owner-zone';

@NgModule({
  declarations: [
    OwnerZonePage,
  ],
  imports: [
    IonicPageModule.forChild(OwnerZonePage),
  ],
})
export class OwnerZonePageModule {}
