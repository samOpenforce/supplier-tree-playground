import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-facility-panel',
  templateUrl: './facility-panel.component.html',
  styleUrls: ['./facility-panel.component.scss'],
})
export class FacilityPanelComponent implements OnInit {
  @Input() chainData?: any; // TODO
  @Input() productData?: any; // TODO
  constructor() {}

  ngOnInit(): void {}
}
