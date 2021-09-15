import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProductListComponent {
  pageTitle = 'Products';
  @Input() products: Product[];
  @Input() selectedProduct: Product;
  @Input() displayCode: boolean;
  @Input() errorMessage: string;

  @Output() toggleProductCode = new EventEmitter<boolean>();
  @Output() initCurrentProduct= new EventEmitter<boolean>();
  @Output() selectProduct= new EventEmitter<Product>();

  checkChanged(): void {
    this.toggleProductCode.emit()
  }

  newProduct(): void {
    this.initCurrentProduct.emit()
  }

  productSelected(product: Product): void {
    this.selectProduct.emit(product)
  }
}
