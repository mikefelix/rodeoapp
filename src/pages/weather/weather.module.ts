import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { WeatherPage } from './weather';

@NgModule({
    declarations: [
      WeatherPage,
    ],
    imports: [
      IonicPageModule.forChild(WeatherPage),
      TranslateModule.forChild()
    ],
    exports: [
      WeatherPage
    ]
  })
  export class WeatherPageModule { }
  
