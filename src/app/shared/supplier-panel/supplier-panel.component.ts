import { AfterContentChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SupplierModel, SupplyChainElement } from '../../app.component';
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

  @Input() chainData?: any; // TODO
  @Input() productData?: any; // TODO
  @Input() indexes!: ElementIndexes;

  dimensions!: DOMRect;
  child!: Array<SupplyChainElement> | null;
  constructor(private canvasService: CanvasService, private chainService: ChainService) {}

  ngOnInit(): void {}
  ngAfterContentChecked() {
    this.dimensions = this.supplierPanel?.nativeElement.getBoundingClientRect();
    this.chainService.updateDimensions(
      this.indexes.chainIndex,
      this.indexes.productIndex,
      this.indexes.childIndex,
      this.indexes.siblingIndex,
      this.dimensions
    );
    this.child = this.chainService.getChild(this.indexes.chainIndex, this.indexes.productIndex, this.indexes.childIndex);
    this.drawConnectors();
  }

  private drawConnectors(): void {
    // child can have multiple siblings
    if (this.dimensions && this.child) {
      this.child?.forEach((sibling, index) => {
        let childSiblingDimensions = sibling.dimensions;
        if (childSiblingDimensions) {
          this.canvasService.drawConnector(this.dimensions, childSiblingDimensions);
        }
      });
    }
  }
}
