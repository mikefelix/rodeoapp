export class Garage {

    is_open: boolean = false;
    keep_open: boolean;
    last_open_time: string;
    last_close_time: string;
    next_close_time: string;
    close_attempts: number;
    current_time: string;
    is_night: boolean;
 
    constructor(){  
    }

    isOpen(){
      return this.is_open;
    }

}
