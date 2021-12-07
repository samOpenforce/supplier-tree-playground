import { Injectable } from '@angular/core';
import { AppEventType } from '../models/AppEvent';
import { AppEventService } from './app-event.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  selectedChain: string | null = null;

  constructor(private eventService: AppEventService) {}
}
