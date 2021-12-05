import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SupplierModel, SupplyChainElement, SupplyChainModel } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class ChainService implements OnInit {
  // SUPPLY CHAIN
  private allSupplyChainsSubject = new Subject<Array<SupplyChainModel>>();
  public allSupplyChains: Observable<Array<SupplyChainModel>> = this.allSupplyChainsSubject;
  private $allSupplyChains?: Array<SupplyChainModel>;

  // SUPPLIERS
  private allSuppliersSubject = new Subject<Map<string, SupplierModel>>();
  public allSuppliers: Observable<Map<string, SupplierModel>> = this.allSuppliersSubject;
  // SELECTION
  selectedChain!: SupplyChainModel | null;

  // CO_ORDINATES

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getSuppliers();
    this.getSupplyChains();
  }

  getSuppliers(): void {
    this.http.get('/assets/MOCK-DATA/suppliers.json').subscribe(
      (data: any) => {
        this.allSuppliersSubject.next(new Map(Object.entries(data)));
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    );
  }

  getSupplyChains(): void {
    this.http.get('/assets/MOCK-DATA/supplyChains.json').subscribe(
      (data: any) => {
        this.allSupplyChainsSubject.next(data);
        this.$allSupplyChains = data;
        console.log(this.$allSupplyChains);
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    );
  }

  updateDimensions(chainIndex: number, productIndex: number, childIndex: number, siblingIndex: number, dimensions: DOMRect): void {
    const supplyChains = this.$allSupplyChains;
    if (supplyChains) {
      supplyChains[chainIndex].products[productIndex].children[childIndex][siblingIndex].dimensions = dimensions;
    }
  }

  getChild(chainIndex: number, productIndex: number, childIndex: number): Array<SupplyChainElement> | null {
    const supplyChains = this.$allSupplyChains;
    if (supplyChains) {
      return supplyChains[chainIndex].products[productIndex].children[childIndex + 1];
    } else {
      return null;
    }
  }
}
