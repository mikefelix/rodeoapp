import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { BeerPage } from './beer';

@NgModule({
    declarations: [
      BeerPage,
    ],
    imports: [
      IonicPageModule.forChild(BeerPage),
      TranslateModule.forChild()
    ],
    exports: [
      BeerPage
    ]
  })
  export class BeerPageModule { }
  