import { FacilityModel } from './Facility';
import { ProductModel } from './Product';

export interface SupplyChainModel {
  id: string;
  facility: FacilityModel;
  createdAt?: string;
  updatedAt?: string;
  products: Array<ProductModel>;
  name?: string;
}

export interface SupplyChainElement {
  id: string;
  dimensions: DOMRect;
}
