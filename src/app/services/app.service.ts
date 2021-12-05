import { Injectable } from '@angular/core';
import { AppEventType } from '../models/AppEvent';
import { AppEventService } from './app-event.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  selectedChain: string | null = null;
  selectedProductChain: string | null = null;

  constructor(private eventService: AppEventService) {}

  setSelectedChain(chainId: string): void {
    this.selectedChain = chainId;
    this.eventService.dispatchEvent({
      eventType: AppEventType.CHAIN_SELECTED,
      eventData: {
        selectedChain: this.selectedChain,
        selectedProductChain: this.selectedProductChain,
      },
    });
  }

  setSelectedProductChain(chainId: string, producId: string): void {
    this.selectedChain = chainId;
    this.selectedProductChain = chainId;
    this.eventService.dispatchEvent({
      eventType: AppEventType.CHAIN_SELECTED,
      eventData: {
        selectedChain: this.selectedChain,
        selectedProductChain: this.selectedProductChain,
      },
    });
  }
}
