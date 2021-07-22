import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  timer: number;
  interval;
  state: 'start' | 'stop' = 'stop';
  constructor(public navCtrl: NavController) {}
  startTimer(duration: number) {
    clearInterval(this.interval);
    this.timer = duration * 60;
    setInterval(() => {
      this.updateTimeValue();
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.interval);
    this.time.next('00:00');
    this.state = 'stop';
  }
  updateTimeValue() {
    let minutes: any = this.timer / 60;
    let seconds: any = this.timer % 60;
    minutes = String('0' + Math.floor(minutes)).slice(-2);
    seconds = String('0' + Math.floor(seconds)).slice(-2);
    const text = minutes + ':' + seconds;
    this.time.next(text);
    --this.timer;
    if (this.timer < 0) {
      //alert('end time of count');
      this.startTimer(5);
    }
  }
}
