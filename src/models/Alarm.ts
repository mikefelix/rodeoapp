export class Alarm {

    on: boolean;  // Ringing?
    next: {
        day: string;
        enabled: boolean;
        time: string;
    };
    time: string; // Time the system is listening for today
    times: string[]; // The whole week
    enabled: boolean[];
    lastTriggered: {
        day: string,
        time: string
    };
    override: {
        days: number;
        time: string;
        disable: boolean;
    }
 
    /* 
      { 
        "on":false,
        "next":{"day":"tomorrow","enabled":true,"time":"08:00"},
        "time":"08:00",
        "times":["09:00","08:00","08:00","08:00","08:00","08:00","09:00"]
        "enabled":[true,true,true,true,true,true,true]
      }
    */
    constructor(time: string){
        this.times = [time, time, time, time, time, time, time];  
    }

}
