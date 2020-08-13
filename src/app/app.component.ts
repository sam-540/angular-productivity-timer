import { Component } from '@angular/core';

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

  inputValue = 0; // number of minutes
  isStarted = false;

  start(): void {
    this.isStarted = true;
    this.startTime = Date.now();

    this.interval = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;

      if (this.elapsedTime >= this.inputValue * 1000 * 60) {
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

  stop(): void {
    this.isStarted = false;
    clearInterval(this.interval);
  }

  reset(): void {
    this.stop();
    this.inputValue = 0;
    this.elapsedTime = 0;
  }

  msToTime(time: number): string {
    const ms = time % 1000;
    time = (time - ms) / 1000;
    const secs = time % 60;
    time = (time - secs) / 60;
    const mins = time % 60;
    const hrs = (time - mins) / 60;

    return hrs + ':' + mins + ':' + secs;
  }

  changeInput(event: any): void {
    this.inputValue = event.target.value;
  }
}
