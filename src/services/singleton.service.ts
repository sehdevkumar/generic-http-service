import { Injectable } from '@angular/core';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

@Injectable({
  providedIn: 'root',
})
export class SingletonService {
  loader: LoaderComponent;

  constructor() {}
}
