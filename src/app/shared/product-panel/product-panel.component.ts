import { AfterContentChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FacilityModel } from '../../models/Facility';
import { ProductModel } from '../../models/Product';
import { SupplyChainElement } from '../../models/SupplyChain';
import { CanvasService } from '../../services/canvas.service';
import { ChainService } from '../../services/chain.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'app-product-panel',
  templateUrl: './product-panel.component.html',
  styleUrls: ['./product-panel.component.scss'],
})
export class ProductPanelComponent implements OnInit, AfterContentChecked {
  @ViewChild('productPanel', { static: false }) private productPanel!: ElementRef;
  @Input() product!: ProductModel;
  @Input() facility!: FacilityModel;
  @Input() chainIndex!: number;
  @Input() productIndex!: number;
  child!: Array<SupplyChainElement>;

  dimensions!: DOMRect;

  productActive: boolean = false;
  facilityActive: boolean = false;
  constructor(private chainService: ChainService, private canvasService: CanvasService) {}

  ngOnInit(): void {
    this.child = this.product.children[0];
    this.chainService.selectedProduct.pipe(untilDestroyed(this)).subscribe(
      (result) => {
        result === this.product.id ? (this.productActive = true) : (this.productActive = false);
      },
      (error) => {
        console.error(error);
      }
    );

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
    console.log(this.product.id);
    this.chainService.setSelectedProduct(this.product.id);
  }
}
