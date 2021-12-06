import { NumberFormatStyle } from '@angular/common';
import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  private ctx!: CanvasRenderingContext2D | undefined | null;
  private canvas!: ElementRef<HTMLCanvasElement> | undefined;

  constructor() {}

  /*
The big idea here would be to create an array of connectors {id}
 -- draw as single operation
 -- update or remove individually - will require to retain their last drawn position {rect}
*/

  setCanvasAndCtx(ctx: CanvasRenderingContext2D | undefined | null, canvas: ElementRef<HTMLCanvasElement> | undefined): void {
    this.ctx = ctx;
    this.canvas = canvas;
  }

  clearCanvas(): void {
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    }
  }

  exampleDimensions = {
    x: 819.890625,
    y: 63.984375,
    width: 327.984375,
    height: 355.828125,
    top: 63.984375,
    right: 1147.875,
    bottom: 419.8125,
    left: 819.890625,
  };

  drawConnector(parent: DOMRect, child: DOMRect): void {
    if (this.ctx) {
      this.ctx.strokeStyle = '#1976d2';
      let start = { x: Math.round(parent.right + window.pageXOffset), y: Math.round(parent.top + this.getTopMid(parent.height)) }; // parent top
      let cp1 = { x: child.left + window.pageXOffset - 64, y: parent.top + window.pageYOffset + 64 }; // inline with start and end
      let cp2 = { x: parent.right + window.pageXOffset + 64, y: child.bottom + window.pageYOffset - 64 }; // inline with start and end
      let end = { x: Math.round(child.left + window.pageXOffset), y: Math.round(child.bottom - this.getTopMid(child.height)) }; // child bottom

      // Draw cubic Bézier curve
      this.ctx.lineWidth = 4;
      this.ctx.beginPath();
      this.ctx.moveTo(start.x, start.y);
      this.ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
      this.ctx.stroke();

      // Draw circular Start and end points
      this.ctx.beginPath();
      this.ctx.arc(start.x, start.y, 4, 0, 2 * Math.PI); // Start point
      this.ctx.arc(end.x, end.y, 4, 0, 2 * Math.PI); // End point
      this.ctx.fill();

      // Control points
      /*       this.ctx.fillStyle = 'red';
      this.ctx.beginPath();
      this.ctx.arc(cp1.x, cp1.y, 5, 0, 2 * Math.PI); // Control point one
      this.ctx.arc(cp2.x, cp2.y, 5, 0, 2 * Math.PI); // Control point two
      this.ctx.fill(); */
    }
  }

  getTopMid(value: number): number {
    return value / 2 / 2;
  }

  getControlPointMid(parent: number, child: number): number {
    const total = child - parent;
    return parent + total;
  }

  stripDecimals(value: number): number {
    return 0;
  }
}
