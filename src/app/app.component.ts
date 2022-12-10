import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { HttpClientService } from '../services/http-client.service';
import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { SingletonService } from 'src/services/singleton.service';
import { AfterViewInit } from '@angular/core';
import {
  from,
  of,
  timer,
  interval,
  BehaviorSubject,
  ReplaySubject,
  Subject,
} from 'rxjs';
import { map, take, tap, filter, reduce, first } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(LoaderComponent) loaderCompo: LoaderComponent;
  info: any;
  subject: Subject<string> = new Subject();
  behaviourSub: BehaviorSubject<any> = new BehaviorSubject('Default');
  replaySub: ReplaySubject<any> = new ReplaySubject();

  constructor(
    private httpClient: HttpClientService,
    private ss: SingletonService
  ) {}
  async ngAfterViewInit() {
    this.initLoaderComponets();
  }

  ngOnInit() {
    // this.learningOperators();
    // this.timerRxjs();
    // this.fromRxjs();
    // this.ofRxjs();
    // this.intervalRxjs();
    // this.callAllSubjectsExamples();
  }

  callAllSubjectsExamples() {
    console.log(
      '========================Normal Subject=========================='
    );
    this.onNormalSubject();
    console.log(
      '========================Behaviour Subject =========================='
    );
    this.onBehaviourSubject();
    console.log(
      '======================== Replay Subject=========================='
    );

    this.onRelaySubject();
  }

  onNormalSubject() {
    this.subject.next('Hey');
    this.subject.next('How Are You?');
    this.subject.subscribe((e) => {
      console.log(e);
    });
    this.subject.next('Sehdev');
  }

  onBehaviourSubject() {
    this.behaviourSub.next('Hey');
    this.behaviourSub.next('How Are You?');
    this.behaviourSub.next('Sehdev');
    this.behaviourSub.subscribe((e) => {
      console.log(e);
    });
    this.behaviourSub.next('Sehdev');
  }

  onRelaySubject() {
    this.replaySub.next('Hey');
    this.replaySub.next('How Are You?');
    this.replaySub.pipe(first()).subscribe((e) => {
      console.log(e);
    });
    this.replaySub.next('Sehdev');
  }

  intervalRxjs() {
    interval(1000)
      .pipe(map((e) => new Date().toLocaleTimeString()))
      .subscribe((e) => {
        console.log(e);
      });
  }

  ofRxjs() {
    // Always Takes the values & create the stream , like below examples

    of(1, 2, 3, 4, 5, 6).subscribe((e) => console.log(e));
  }

  fromRxjs() {
    //  Always work with the iterable, promises and Dom Nodes list
    // For Promise
    from(Promise.resolve(1111)).subscribe((e) => console.log(e));
    // for Array
    from([1, 2, 3, 3, 4]).subscribe((e) => console.log(e));
    // Dom Elements Nodes List
    from(document.querySelectorAll('div')).subscribe((e) => console.log(e));
  }

  // All mix operators
  learningOperators() {
    const stream$ = of(1, 2, 3, 4, 5, 6, 7, 8);
    stream$
      ?.pipe(
        tap((e) => {
          console.log('tap=>', e);
        }),
        map((e) => e * 4),
        filter((e) => e > 7),
        reduce((a, v) => a + v, 0)
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  timerRxjs() {
    timer(2000, 3000).subscribe(() => {
      console.log('After Some Time');
    });
  }

  initLoaderComponets() {
    this.ss.loader = this.loaderCompo;
  }
}
