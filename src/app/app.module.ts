import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, RoundProgressModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
