import { SingletonService } from './../services/singleton.service';
import { HttpClientService } from '../services/http-client.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
@NgModule({
  declarations: [AppComponent, LoaderComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [HttpClientService, SingletonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
