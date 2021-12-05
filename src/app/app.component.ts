import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ResizedEvent } from 'angular-resize-event';
import { CanvasService } from './services/canvas.service';
import { ChainService } from './services/chain.service';
export interface SupplierModel {
  name: string;
}

export interface ElementConnections {
  topLeft: number;
  midLeft: number;
  bottomLeft: number;
  topMid: number;
  topRight: number;
  midRight: number;
  bottomRight: number;
  bottomMid: number;
}

export interface ElementDimensions {
  height: number;
  width: number;
  elx: number;
  ely: number;
}

export interface SupplyChainElement {
  id: string;
  dimensions: DOMRect;
}
export interface ProductModel {
  children: Array<Array<SupplyChainElement>>;
}

export interface SupplyChainModel {
  id: string;
  facilityId: string;
  createdAt?: string;
  updatedAt?: string;
  products: Array<ProductModel>;
  name?: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild('connectorLayer', { static: false }) connectorLayer?: ElementRef<HTMLCanvasElement>;

  selectedChain: string | null = null;
  selectedProductChain: string | null = null;
  public usedSuppliers: Map<string, SupplierModel> = new Map<string, SupplierModel>();
  testMessage = '';
  supplyChains: Array<SupplyChainModel> = [];

  constructor(private canvasService: CanvasService, private chainService: ChainService) {}

  ngOnInit(): void {
    this.chainService.ngOnInit();

    this.chainService.allSupplyChains.subscribe((result) => {
      this.supplyChains = result;
    });

    this.chainService.allSuppliers.subscribe((result) => {
      this.usedSuppliers = result;
    });
  }

  ngAfterViewInit(): void {
    this.canvasService.setCanvasAndCtx(this.connectorLayer?.nativeElement.getContext('2d'), this.connectorLayer);
  }

  // on long press select product chain or all chains for facility press
  selectChain(id: string): void {
    if (this.selectedChain === id) {
      this.selectedChain = null;
    } else {
      this.selectedChain = id;
    }
  }

  drop(event: any): void {
    console.log(event);
  }

  contentResized(event: ResizedEvent) {
    this.connectorLayer?.nativeElement.setAttribute('width', event.newRect.width.toString());
    this.connectorLayer?.nativeElement.setAttribute('height', event.newRect.height.toString());
  }
}
