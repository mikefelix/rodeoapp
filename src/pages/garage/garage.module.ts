import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { GaragePage } from './garage';

@NgModule({
    declarations: [
      GaragePage,
    ],
    imports: [
      IonicPageModule.forChild(GaragePage),
      TranslateModule.forChild()
    ],
    exports: [
      GaragePage
    ]
  })
  export class GaragePageModule { }
  