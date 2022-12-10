import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { HttpClientService } from 'src/services/http-client.service';
import { switchMap } from 'rxjs/operators';

/**
 * @description
 * switchMap is used to cancel all the previously made requests, it is very useful when the user makes the wrong request to the server he could not control this but if we use the switchMap operator then it is possible to cancel out the request and show the result with latest one request made by the user.
 */

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.scss'],
})
export class SwitchMapComponent implements OnInit {
  posts: any;
  sub: BehaviorSubject<any> = new BehaviorSubject('');

  constructor(private http: HttpClientService) {}

  getData(param) {
    this.http.BASE_URL$ = 'https://jsonplaceholder.typicode.com/';

    return this.http.request('GET', `posts/${param}`);
  }

  ngOnInit(): void {
    this.sub.pipe(switchMap((id) => this.getData(id))).subscribe((res) => {
      this.posts = res?.body;
    });
  }

  onOptionSelect(event: any) {
    const id = event?.value;

    timer(2000).subscribe(() => {
      this.sub.next(id);
    });
  }
}
