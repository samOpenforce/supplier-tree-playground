import { AfterContentChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProductModel } from '../../models/Product';
import { SupplyChainElement } from '../../models/SupplyChain';
import { CanvasService } from '../../services/canvas.service';
import { ChainService } from '../../services/chain.service';

@Component({
  selector: 'app-product-panel',
  templateUrl: './product-panel.component.html',
  styleUrls: ['./product-panel.component.scss'],
})
export class ProductPanelComponent implements OnInit, AfterContentChecked {
  @ViewChild('productPanel', { static: false }) private productPanel!: ElementRef;
  @Input() product!: ProductModel;
  @Input() chainIndex!: number;
  @Input() productIndex!: number;
  child!: Array<SupplyChainElement>;

  dimensions!: DOMRect;
  constructor(private chainService: ChainService, private canvasService: CanvasService) {}

  ngOnInit(): void {
    this.child = this.product.children[0];
  }
  ngAfterContentChecked() {
    this.dimensions = this.productPanel?.nativeElement.getBoundingClientRect();
    this.chainService.updateProductDimensions(this.chainIndex, this.productIndex, this.dimensions);
    this.drawConnectors();
  }

  drawConnectors(): void {
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

  setSelectedProduct(event: MouseEvent | KeyboardEvent): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    console.log('=== set selected product ===', this.product.id);
    this.chainService.setSelectedProduct(this.product.id);
    this.canvasService.clearCanvas();
  }
}
