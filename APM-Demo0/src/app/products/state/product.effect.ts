import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { mergeMap, map, catchError, concatMap, tap } from "rxjs/operators";
import { ProductService } from "../product.service";
import * as productActions from "./product.actions";

@Injectable()
export class ProductEffects {
    constructor(private action$: Actions, private productService: ProductService) {

    }

    loadProducts$ = createEffect(() => {
        return this.action$.pipe(
            ofType(productActions.loadingProducts),
            mergeMap(() => this.productService.getProducts().pipe(
                map(products => productActions.loadedProducts({ products })),
                catchError(error => of(productActions.errorLoadingProducts({ error })))
            ))
        ) 
    })

    updateProduct$ = createEffect(() => {
        return this.action$.pipe(
            ofType(productActions.updateProduct),
            concatMap(action => this.productService.updateProduct(action.product).pipe(
                map(product => productActions.updateProductSuccess({ product })),
                catchError(error => of(productActions.updateProductFailure({ error })))
            ))
        )
    })

    createProduct$ = createEffect(() => {
        return this.action$.pipe(
            ofType(productActions.createProduct),
            mergeMap(action => this.productService.createProduct(action.product).pipe(
                map(product => productActions.createProductSuccess({ product })),
                catchError(error => of(productActions.createProductFailure({ error })))
            ))
        )
    })

    removeProduct$ = createEffect(() => {
        return this.action$.pipe(
            ofType(productActions.removeProduct),
            mergeMap(action => this.productService.deleteProduct(action.productId).pipe(
                map(() => productActions.removeProductSuccess({ productId: action.productId })),
                catchError(error => of(productActions.removeProductFailure({ error })))
            ))
        )
    })


}