import { createAction, props } from "@ngrx/store";
import { Product } from "../product";

export const toggleProductCode = createAction('[Product] toggle product code');
export const setCurrentProduct = createAction('[Product] set current product', props<{ currentProductId: number }>());
export const clearCurrentProduct = createAction('[Product] clear current product');
export const initCurrentProduct = createAction('[Product] Init current product');

export const loadingProducts = createAction('[Product] loading products');
export const loadedProducts = createAction('[Product] loaded products', props<{ products: Product[]}>());
export const errorLoadingProducts = createAction('[Product] error loading products', props<{ error: string}>());


export const updateProduct = createAction('[Product] Update', props<{ product: Product }>());
export const updateProductSuccess = createAction('[Product] Update success', props<{ product: Product }>());
export const updateProductFailure = createAction('[Product] Update fail', props<{ error: string }>());

export const createProduct = createAction('[Product] Create', props<{ product: Product }>());
export const createProductSuccess = createAction('[Product] Create success', props<{ product: Product }>());
export const createProductFailure = createAction('[Product] Create fail', props<{ error: string }>());

export const removeProduct = createAction('[Product] Remove', props<{ productId: number }>());
export const removeProductSuccess = createAction('[Product] Remove success', props<{ productId: number }>());
export const removeProductFailure = createAction('[Product] Remove fail', props<{ error: string }>());