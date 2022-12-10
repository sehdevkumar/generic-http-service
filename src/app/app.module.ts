import { SingletonService } from './../services/singleton.service';
import { HttpClientService } from '../services/http-client.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './materials-module';
import { SwitchMapComponent } from './rxjs-operators/switch-map/switch-map.component';
import { MergeMapComponent } from './rxjs-operators/merge-map/merge-map.component';
import { ConcatMapComponent } from './rxjs-operators/concat-map/concat-map.component';
@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    ReactiveFormComponent,
    SwitchMapComponent,
    MergeMapComponent,
    ConcatMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [HttpClientService, SingletonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
