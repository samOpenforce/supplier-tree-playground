import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from '../../models/Product';

@Component({
  selector: 'app-product-panel',
  templateUrl: './product-panel.component.html',
  styleUrls: ['./product-panel.component.scss'],
})
export class ProductPanelComponent implements OnInit {
  @Input() product!: ProductModel;
  constructor() {}

  ngOnInit(): void {}
}
