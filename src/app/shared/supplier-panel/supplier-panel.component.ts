import { AfterContentChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SupplierModel } from '../../models/Supplier';
import { SupplyChainElement } from '../../models/SupplyChain';

import { CanvasService } from '../../services/canvas.service';
import { ChainService } from '../../services/chain.service';

export interface ElementIndexes {
  chainIndex: number;
  productIndex: number;
  childIndex: number;
  siblingIndex: number;
}
@Component({
  selector: 'app-supplier-panel',
  templateUrl: './supplier-panel.component.html',
  styleUrls: ['./supplier-panel.component.scss'],
})
export class SupplierPanelComponent implements OnInit, AfterContentChecked {
  @ViewChild('supplierPanel', { static: false }) private supplierPanel!: ElementRef;
  @Input() facility!: string;
  @Input() product!: string;
  @Input() supplier!: SupplierModel | undefined;
  @Input() child!: Array<SupplyChainElement> | undefined;
  @Input() indexes!: ElementIndexes;

  dimensions!: DOMRect;

  productActive: boolean = false;
  facilityActive: boolean = false;
  constructor(private canvasService: CanvasService, private chainService: ChainService) {}

  ngOnInit(): void {
    this.chainService.selectedProduct.subscribe(
      (result) => {
        // console.log('product selected result', result);
        result === this.product ? (this.productActive = true) : (this.productActive = false);
      },
      (error) => {
        console.error(error);
      }
    );

    this.chainService.selectedFacility.subscribe(
      (result) => {
        //console.log('facility selected result', result);
        result === this.facility ? (this.facilityActive = true) : (this.facilityActive = false);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  ngAfterContentChecked() {
    this.dimensions = this.supplierPanel?.nativeElement.getBoundingClientRect();
    this.chainService.updateDimensions(
      this.indexes.chainIndex,
      this.indexes.productIndex,
      this.indexes.childIndex,
      this.indexes.siblingIndex,
      this.dimensions
    );
    this.drawConnectors();
  }

  private drawConnectors(): void {
    // child can have multiple siblings
    if (this.dimensions && this.child) {
      this.child?.forEach((sibling) => {
        let childSiblingDimensions = sibling.dimensions;
        if (childSiblingDimensions) {
          this.canvasService.drawConnector(this.dimensions, childSiblingDimensions);
        }
      });
    }
  }

  clearCanvasTest(): void {
    this.canvasService.clearCanvas();
  }
}
