import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SupplierModel } from '../models/Supplier';
import { SupplyChainModel } from '../models/SupplyChain';

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
  // Facility
  private selectedFacilitySubject = new BehaviorSubject<string | null>(null);
  public selectedFacility: Observable<string | null> = this.selectedFacilitySubject;
  private $selectedFacility?: string | null;
  // Product
  private selectedProductSubject = new BehaviorSubject<string | null>(null);
  public selectedProduct: Observable<string | null> = this.selectedProductSubject;
  private $selectedProduct?: string | null;

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

  updateFacilityDimensions(chainIndex: number, dimensions: DOMRect): void {
    const supplyChains = this.$allSupplyChains;
    if (supplyChains && supplyChains[chainIndex].facility) {
      supplyChains[chainIndex].facility.dimensions = dimensions;
    }
  }

  setSelectedFacility(chainId: string): void {
    console.log('chain service sets facility to:', chainId);
    if (this.$selectedFacility === chainId) {
      // remove selection
      this.$selectedFacility = null;
      this.selectedFacilitySubject.next(null);
    } else {
      this.$selectedFacility = chainId;
      this.selectedFacilitySubject.next(chainId);
    }
  }

  setSelectedProductChain(chainId: string, productId: string): void {
    console.log('chain service sets product to:', productId);
    this.$selectedFacility = chainId;
    this.selectedFacilitySubject.next(chainId);
    this.$selectedProduct = productId;
    this.selectedFacilitySubject.next(productId);
  }
}
