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
    clearInterval(this.clearTimer);
    this.hiderLoader = false;
    this.index++;
  }

  hide() {
    this.hiderLoader = true;
    this.clearTimer = setTimeout(() => {
      this.hiderLoader = true;
      clearInterval(this.clearTimer);
    }, 50);
  }
}
