import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/services/http-client.service';
import { map, mergeMap, mergeAll, delay, concatMap } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-concat-map',
  templateUrl: './concat-map.component.html',
  styleUrls: ['./concat-map.component.scss'],
})
export class ConcatMapComponent implements OnInit {
  constructor(private http: HttpClientService) {}

  getData(param) {
    const timerDelay = Math.random() * 1000 + 1;
    this.http.BASE_URL$ = 'https://jsonplaceholder.typicode.com/';

    return this.http.request('GET', `posts/${param}`).pipe(delay(timerDelay));
  }

  ngOnInit(): void {
    // using mergeMap
    from([1, 2, 3, 4])
      .pipe(mergeMap((param) => this.getData(param)))
      .subscribe((val) => console.log(val?.body?.id));

    console.log(
      '=======================Using concatMap==============================='
    );

    // using concatMap
    from([1, 2, 3, 4])
      .pipe(concatMap((param) => this.getData(param)))
      .subscribe((val) => console.log(val?.body?.id));
  }
}
