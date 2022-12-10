import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @HostBinding('class.dis-nn') public hiderLoader = false;
  clearTimer: any;
  index = 0;

  constructor() {}

  ngOnInit(): void {}

  show() {
    this.hiderLoader = false;
  }

  hide() {
    setTimeout(() => {
      this.hiderLoader = true;
    }, 5000);
  }
}
