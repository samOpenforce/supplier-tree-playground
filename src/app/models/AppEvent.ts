export enum AppEventType {
  CHAIN_SELECTED = 'CHAIN_SELECTED',
}

export class AppEvent {
  constructor(public eventType: AppEventType, public eventData?: any) {}
}
