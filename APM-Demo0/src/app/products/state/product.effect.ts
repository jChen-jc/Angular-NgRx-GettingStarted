import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";
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


}