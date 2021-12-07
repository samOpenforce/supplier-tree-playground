import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FacilityModel } from '../../models/Facility';
import { SupplyChainModel } from '../../models/SupplyChain';

import { AppService } from '../../services/app.service';
import { CanvasService } from '../../services/canvas.service';
import { ChainService } from '../../services/chain.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
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

  facilityActive: boolean = false;
  ngOnInit(): void {
    this.facility = this.chainData.facility;

    this.chainService.selectedFacility.pipe(untilDestroyed(this)).subscribe(
      (result) => {
        result === this.facility.id ? (this.facilityActive = true) : (this.facilityActive = false);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngAfterContentChecked() {
    this.dimensions = this.facilityPanel?.nativeElement.getBoundingClientRect();
    this.chainService.updateFacilityDimensions(this.chainIndex, this.dimensions);
    //this.drawConnectors();
  }
  setSelectedFacility(): void {
    this.chainService.setSelectedFacility(this.facility.id);
  }
}
