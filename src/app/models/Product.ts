import { SupplyChainElement } from './SupplyChain';

export interface ProductModel {
  id: string;
  children: Array<Array<SupplyChainElement>>;
}
