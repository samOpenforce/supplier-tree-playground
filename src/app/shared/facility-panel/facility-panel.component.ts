import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FacilityModel } from '../../models/Facility';
import { SupplyChainModel } from '../../models/SupplyChain';

import { AppService } from '../../services/app.service';
import { CanvasService } from '../../services/canvas.service';
import { ChainService } from '../../services/chain.service';

@Component({
  selector: 'app-facility-panel',
  templateUrl: './facility-panel.component.html',
  styleUrls: ['./facility-panel.component.scss'],
})
export class FacilityPanelComponent implements OnInit {
  @ViewChild('facilityPanel', { static: false }) private facilityPanel!: ElementRef;
  @Input() chainData!: SupplyChainModel; // TODO
  @Input() chainIndex!: number;
  @Input() productData?: any; // TODO
  constructor(private appService: AppService, private canvasService: CanvasService, private chainService: ChainService) {}
  facility!: FacilityModel;
  dimensions!: DOMRect;

  ngOnInit(): void {
    this.facility = this.chainData.facility;
    console.log('=== FACILITY CREATED ===', this.facility);
    console.log('=== FACILITY CHAIN ===', this.chainData);
  }

  ngAfterContentChecked() {
    this.dimensions = this.facilityPanel?.nativeElement.getBoundingClientRect();
    this.chainService.updateFacilityDimensions(this.chainIndex, this.dimensions);
    //this.drawConnectors();
  }
  setSelectedFacility(): void {
    console.log('=== set facility active ===', this.facility.id);

    console.log('=== select all product chains for facility ===');
    this.chainService.setSelectedFacility(this.facility.id);
  }
  selectProductSupplyChain(productIndex: any): void {
    console.log('=== select single product chain for facility ===');
    this.appService.setSelectedProductChain(this.facility.id, productIndex);
  }
}
