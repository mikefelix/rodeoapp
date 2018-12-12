import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { CurrentWeatherProvider } from '../providers/current';
import { Forecast1Provider } from '../providers/forecast1';
import { Forecast2Provider } from '../providers/forecast2';
import { HistoricalWeatherProvider } from '../providers/historical';
import { ThermProvider } from '../providers/therm';
import { DevicesProvider } from '../providers/devices';
import { GarageProvider } from '../providers/garage';
import { AlarmProvider } from '../providers/alarm';
import { TimesProvider } from '../providers/times';
import { BeerProvider } from '../providers/beer';
import { SchedulesProvider } from '../providers/schedules';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    /*TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),*/
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    /*Api,
    Camera,
    Items,
    User,*/
    TimesProvider,
    CurrentWeatherProvider,
    Forecast1Provider,
    Forecast2Provider,
    HistoricalWeatherProvider,
    GarageProvider,
    DevicesProvider,
    ThermProvider,
    AlarmProvider,
    BeerProvider,
    SchedulesProvider,
    SplashScreen,
    StatusBar,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
