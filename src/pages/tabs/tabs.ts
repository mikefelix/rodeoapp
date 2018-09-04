import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ThermProvider } from '../../providers/therm';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = 'LightsPage';
  tab2Root: any = 'GaragePage';
  tab3Root: any = 'WeatherPage';
  tab4Root: any = 'AlarmPage';
  tab5Root: any = 'HistoryPage';

  constructor(public navCtrl: NavController) {
  }

  changeTab(){

  }
}

/*

{
  "away": false,
  "garage": {
    "is_open": false,
    "keep_open": false,
    "last_open_time": "07/17/2018, 11:57:28am",
    "last_close_time": "07/17/2018, 11:58:23am",
    "next_close_time": null,
    "close_attempts": 0,
    "current_time": "07/17/2018, 1:17:34pm"
  },
  "bulbs": {
    "fan": {
      "on": false
    },
    "vent": {
      "on": false
    },
    "lamp": {
      "on": false
    },
    "garage": {
      "on": false
    },
    "breezeway": {
      "on": false
    },
    "driveway": {
      "on": false
    },
    "outside": {
      "on": false
    },
    "coffee": {
      "on": true,
      "power": 33.222
    },
    "piano": {
      "on": true,
      "power": 1.361
    },
    "office": {
      "on": false,
      "power": 0
    },
    "wine": {
      "on": false,
      "power": 0
    },
    "aquarium": {
      "on": true,
      "power": 13.002
    },
    "stereo": {
      "on": false,
      "power": 0
    }
  },
  "schedules": {
    "coffee": {
      "on": {
        "spec": "06:45",
        "date": "07/17/2018, 6:45:00am"
      },
      "off": {
        "spec": "23:00",
        "date": "07/17/2018, 11:00:00pm"
      }
    },
    "piano": {
      "off": {
        "spec": "~60"
      }
    },
    "driveway": {
      "off": {
        "spec": "1"
      }
    },
    "outside": {
      "off": {
        "spec": "3"
      }
    },
    "fan": {
      "off": {
        "spec": "90"
      }
    },
    "lamp": {
      "on": {
        "spec": "sunset-45",
        "date": "07/17/2018, 8:09:33pm"
      },
      "off": {
        "spec": "23:00",
        "date": "07/17/2018, 11:00:00pm"
      }
    },
    "aquarium": {
      "on": {
        "spec": "sunrise",
        "date": "07/17/2018, 6:11:50am"
      },
      "off": {
        "spec": "22:00",
        "date": "07/17/2018, 10:00:00pm"
      }
    },
    "wine": {
      "on": {
        "spec": "sunset",
        "date": "07/17/2018, 8:54:33pm"
      },
      "off": {
        "spec": "23:52",
        "date": "07/17/2018, 11:52:00pm"
      }
    },
    "housefan": {
      "on": {
        "spec": "!earlymorn & !hvac.on & hvac.nearTarget"
      }
    },
    "vent": {
      "on": {
        "spec": "housefan.on"
      },
      "off": {
        "spec": "!housefan.on"
      }
    },
    "office": {
      "on": {
        "spec": "!day & 192.168.0.112"
      },
      "off": {
        "spec": "day | !192.168.0.112"
      }
    },
    "stereo": {}
  },
  "hvac": {
    "humidity": 45,
    "temp": 77,
    "target": 78,
    "state": "off",
    "mode": "cool",
    "on": false,
    "nearTarget": false
  },
  "housefan": {
    "on": false
  },
  "times": {
    "current": "07/17/2018, 1:17:36pm",
    "isNight": false,
    "sunrise": "07/17/2018, 6:11:50am",
    "sunset": "07/17/2018, 8:54:33pm",
    "dayReset": "07/17/2018, 4:00:00am"
  },
  "history": {
    "coffee": {
      "off": {
        "date": "07/16/2018, 11:00:47pm",
        "source": "schedule (off)"
      },
      "on": {
        "date": "07/17/2018, 6:45:50am",
        "source": "schedule (on)"
      }
    },
    "piano": {},
    "wine": {
      "on": {
        "date": "07/16/2018, 8:55:45pm",
        "source": "schedule (on)"
      },
      "off": {
        "date": "07/16/2018, 11:52:47pm",
        "source": "schedule (off)"
      }
    },
    "office": {
      "on": {
        "date": "07/16/2018, 11:07:48pm",
        "source": "schedule (on)"
      },
      "off": {
        "date": "07/16/2018, 11:45:47pm",
        "source": "schedule (off)"
      }
    },
    "stereo": {
      "on": {
        "date": "07/17/2018, 1:06:02am",
        "source": "POST /alight/stereo"
      },
      "off": {
        "date": "07/17/2018, 8:11:17am",
        "source": "POST /unlight/stereo"
      }
    },
    "aquarium": {
      "off": {
        "date": "07/16/2018, 10:00:48pm",
        "source": "schedule (off)"
      },
      "on": {
        "date": "07/17/2018, 6:11:52am",
        "source": "schedule (on)"
      }
    },
    "garage": {},
    "breezeway": {},
    "driveway": {
      "off": {
        "date": "07/16/2018, 8:04:45pm",
        "source": "schedule (off)"
      }
    },
    "outside": {},
    "fan": {
      "off": {
        "date": "07/17/2018, 10:01:47am",
        "source": "schedule (off)"
      }
    },
    "vent": {
      "on": {
        "date": "07/17/2018, 9:02:48am",
        "source": "schedule (on)"
      },
      "off": {
        "date": "07/17/2018, 10:04:48am",
        "source": "schedule (off)"
      }
    },
    "lamp": {
      "on": {
        "date": "07/16/2018, 8:10:45pm",
        "source": "schedule (on)"
      },
      "off": {
        "date": "07/16/2018, 11:00:48pm",
        "source": "schedule (off)"
      }
    }
  }
}

*/