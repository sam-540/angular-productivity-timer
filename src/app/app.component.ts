import { Component } from '@angular/core';
import { TimeInterval } from 'rxjs';

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

  start(): void {
    this.startTime = Date.now();

    this.timerLength = this.timerLength * 1000 * 60;

    this.interval = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;
      console.log(
        this.elapsedTime,
        this.timerLength,
        (100 * (this.timerLength - this.elapsedTime)) / this.timerLength
      );

      if (this.elapsedTime >= this.timerLength) {
        clearInterval(this.interval);
      }
    }, this.delta);
  }

  stop(): void {
    // this.elapsedTime = this.timerLength;
    clearInterval(this.interval);
  }

  changeInput(event: any): void {
    this.timerLength = event.target.value;
  }
}
