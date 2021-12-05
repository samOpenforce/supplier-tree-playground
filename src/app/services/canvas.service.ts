import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  private ctx!: CanvasRenderingContext2D | undefined | null;
  private canvas!: ElementRef<HTMLCanvasElement> | undefined;
  constructor() {}

  setCanvasAndCtx(ctx: CanvasRenderingContext2D | undefined | null, canvas: ElementRef<HTMLCanvasElement> | undefined): void {
    this.ctx = ctx;
    this.canvas = canvas;
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
    console.log(parent);
    console.log(child);

    if (this.ctx) {
      let start = { x: parent.right + window.scrollX, y: parent.top + window.scrollY }; // parent top
      let cp1 = { x: child.left + window.scrollX, y: parent.top + window.scrollY }; // inline with start and end
      let cp2 = { x: parent.right + window.scrollX, y: child.bottom + window.scrollY }; // inline with start and end
      let end = { x: child.left + window.scrollX, y: child.bottom + window.scrollY }; // child bottom

      //  this.ctx.clearRect(0, 0, this.canvas?.nativeElement.width || 0, this.canvas?.nativeElement.width || 0);
      // Cubic Bézier curve
      this.ctx.lineWidth = 4;
      this.ctx.beginPath();
      this.ctx.moveTo(start.x, start.y);
      this.ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
      this.ctx.stroke();

      // Start and end points

      this.ctx.beginPath();
      this.ctx.arc(start.x, start.y, 4, 0, 2 * Math.PI); // Start point
      this.ctx.arc(end.x, end.y, 4, 0, 2 * Math.PI); // End point
      this.ctx.fill();

      // Control points
      this.ctx.fillStyle = 'red';
      this.ctx.beginPath();
      this.ctx.arc(cp1.x, cp1.y, 5, 0, 2 * Math.PI); // Control point one
      this.ctx.arc(cp2.x, cp2.y, 5, 0, 2 * Math.PI); // Control point two
      this.ctx.fill();
    }
  }
}
