import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Product } from '../product';
import { State, getShowProductCode, getCurrentProduct, getProducts, getLoadProductError } from '../state';
import { toggleProductCode, setCurrentProduct, initCurrentProduct, loadingProducts } from '../state/product.actions';
@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(loadingProducts());

    this.products$ = this.store.select(getProducts);
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.displayCode$ = this.store.select(getShowProductCode);
    this.errorMessage$ = this.store.select(getLoadProductError);
  }

  checkChanged(): void {
    this.store.dispatch(toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(initCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(setCurrentProduct({ currentProductId: product.id }));
  }
}
