import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ResizedEvent } from 'angular-resize-event';
import { SupplierModel } from './models/Supplier';
import { SupplyChainModel } from './models/SupplyChain';
import { CanvasService } from './services/canvas.service';
import { ChainService } from './services/chain.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild('connectorLayer', { static: false }) connectorLayer?: ElementRef<HTMLCanvasElement>;

  public usedSuppliers: Map<string, SupplierModel> = new Map<string, SupplierModel>();

  supplyChains!: Array<SupplyChainModel>;

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

  drop(event: any): void {
    console.log(event);
  }

  contentResized(event: ResizedEvent) {
    this.connectorLayer?.nativeElement.setAttribute('width', event.newRect.width.toString());
    this.connectorLayer?.nativeElement.setAttribute('height', event.newRect.height.toString());
  }
}
