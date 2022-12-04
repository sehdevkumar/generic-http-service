import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { HttpClientService } from '../services/http-client.service';
import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { SingletonService } from 'src/services/singleton.service';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(LoaderComponent) loaderCompo: LoaderComponent;
  constructor(
    private httpClient: HttpClientService,
    private ss: SingletonService
  ) {}
  async ngAfterViewInit() {
    this.initLoaderComponets();
  }

  callApi() {
    this.httpClient.request('GET', 'fact')?.subscribe((response) => {
      if (response?.status === 200) {
        // this.callApi();
      } else {
        console.log(response);
      }
    });
  }

  ngOnInit() {
    this.httpClient.request('GET', 'fact')?.subscribe((response) => {
      if (response?.status === 200) {
        // this.callApi();
        // this.callApi();
        // this.callApi();
        // this.callApi();
        // this.callApi();
        // this.callApi();
        // this.callApi();
        // this.callApi();
        // this.callApi();
      } else {
        console.log(response);
      }
    });
  }

  initLoaderComponets() {
    this.ss.loader = this.loaderCompo;
  }
}
