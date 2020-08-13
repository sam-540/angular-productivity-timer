import { Component } from '@angular/core';
import { interval, Observable } from 'rxjs';

import { takeWhile, tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  startTime: number;
  delta = 100; // milliseconds
  timerInterval: number;

  elapsedTime = 0;

  inputValue = 0; // number of minutes
  isStarted = false;

  observableInterval: Observable<number> = interval(this.delta);

  start(): void {
    this.isStarted = true;

    this.observableInterval
      .pipe(
        takeWhile((_) => this.elapsedTime <= this.totalTime && this.isStarted),
        tap((_) => (this.elapsedTime += this.delta))
      )
      .subscribe((dat) => {
        console.log(dat);
        if (this.elapsedTime >= this.totalTime) {
          this.playChime();
          this.stop();
        } else if (!this.isStarted) {
          this.stop();
        }
      });
  }

  playChime(): void {
    const audio = new Audio('../assets/chime.mp3');
    audio.load();
    audio.play();
  }

  stop(): void {
    this.isStarted = false;
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

    return hrs + ':' + mins + ':' + secs + '.' + ms / 100;
  }

  changeInput(event: any): void {
    this.inputValue = event.target.value;
  }

  get totalTime(): number {
    return this.inputValue * 1000 * 60;
  }
}
