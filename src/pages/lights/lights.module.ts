import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { LightsPage } from './lights';

@NgModule({
    declarations: [
      LightsPage,
    ],
    imports: [
      IonicPageModule.forChild(LightsPage),
      TranslateModule.forChild()
    ],
    exports: [
      LightsPage
    ]
  })
  export class LightsPageModule { }
  
