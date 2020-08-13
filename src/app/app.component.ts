import { Component } from '@angular/core';
import { TimeInterval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  startTime: number;
  elapsedTime = 0;
  delta = 1000; // milliseconds
  interval: number;
  timeLength: number;

  inputValue = 0; // number of minutes
  isStarted = false;

  start(): void {
    this.isStarted = true;
    this.startTime = Date.now();

    this.interval = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;

      if (this.elapsedTime >= this.inputValue) {
        this.stop();
        this.playChime();
      }
    }, this.delta);
  }

  playChime(): void {
    const audio = new Audio('../assets/chime.mp3');
    audio.load();
    audio.play();
  }

  pause(): void {
    this.stop();
    this.inputValue = (this.inputValue - this.elapsedTime) / 60 / 1000;
  }

  stop(): void {
    // this.elapsedTime = this.timerLength;
    this.isStarted = false;
    clearInterval(this.interval);
  }

  msToTime(s): string {
    const ms = s % 1000;
    s = (s - ms) / 1000;
    const secs = s % 60;
    s = (s - secs) / 60;
    const mins = s % 60;
    const hrs = (s - mins) / 60;

    return hrs + ':' + mins + ':' + secs;
  }

  // changeInput(event: any): void {
  //   this.timerLength = event.target.value;
  // }
}
