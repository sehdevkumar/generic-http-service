import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

@Injectable({
  providedIn: 'root',
})
export class SingletonService {
  loader: LoaderComponent;

  firstSubject: Subject<number> = new Subject();
  secondSubject: Subject<number> = new Subject();
  thirdSubject: Subject<number> = new Subject();

  constructor() {}
}
