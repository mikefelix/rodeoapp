import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { DevicesPage } from './devices';

@NgModule({
    declarations: [
      DevicesPage,
    ],
    imports: [
      IonicPageModule.forChild(DevicesPage),
      TranslateModule.forChild()
    ],
    exports: [
      DevicesPage
    ]
  })
  export class LightsPageModule { }
  
