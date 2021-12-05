import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AppEvent } from '../models/AppEvent';

@Injectable({
  providedIn: 'root',
})
export class AppEventService {
  private subject = new Subject<AppEvent>();

  constructor() {}

  dispatchEvent(data: AppEvent): void {
    this.subject.next(data);
  }

  subscribe(next?: (value: AppEvent) => void): Subscription {
    return this.subject.asObservable().subscribe(next);
  }
}
