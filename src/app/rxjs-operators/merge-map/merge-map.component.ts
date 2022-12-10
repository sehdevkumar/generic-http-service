import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/services/http-client.service';
import { map, mergeMap, mergeAll } from 'rxjs/operators';
import { from } from 'rxjs';
@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.scss'],
})
export class MergeMapComponent implements OnInit {
  constructor(private http: HttpClientService) {}

  getData(param) {
    this.http.BASE_URL$ = 'https://jsonplaceholder.typicode.com/';

    return this.http.request('GET', `posts/${param}`);
  }

  ngOnInit(): void {
    // using a regular map
    from([1, 2, 3, 4])
      .pipe(map((param) => this.getData(param)))
      .subscribe((val) => val.subscribe((data) => console.log(data)));
    // using map and mergeAll
    from([1, 2, 3, 4])
      .pipe(
        map((param) => this.getData(param)),
        mergeAll()
      )
      .subscribe((val) => console.log(val));
    // using mergeMap
    from([1, 2, 3, 4])
      .pipe(mergeMap((param) => this.getData(param)))
      .subscribe((val) => console.log(val));
  }
}
