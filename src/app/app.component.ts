import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  startTime: number;
  elapsedTime: number;
  timerLength: number;
  delta: 100; // milliseconds
  interval: any;
  chime = false;

  start(): void {
    this.chime = false;
    this.startTime = Date.now();

    this.timerLength = this.timerLength * 1000 * 60;

    this.interval = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;

      if (this.elapsedTime >= this.timerLength) {
        this.stop();
      }
    }, this.delta);
  }

  playChime(): void {
    const audio = new Audio('../assets/chime.mp3');
    audio.load();
    audio.play();
  }

  stop(): void {
    // this.elapsedTime = this.timerLength;
    this.playChime();
    clearInterval(this.interval);
  }

  changeInput(event: any): void {
    this.timerLength = event.target.value;
  }
}
