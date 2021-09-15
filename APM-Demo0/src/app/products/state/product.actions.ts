import { createAction, props } from "@ngrx/store";
import { Product } from "../product";

export const toggleProductCode = createAction('[Product] toggle product code');
export const setCurrentProduct = createAction('[Product] set current product', props<{ product: Product}>());
export const clearCurrentProduct = createAction('[Product] clear current product');
export const initCurrentProduct = createAction('[Product] Init current product');

export const loadingProducts = createAction('[Product] loading products');
export const loadedProducts = createAction('[Product] loaded products', props<{ products: Product[]}>());
export const errorLoadingProducts = createAction('[Product] error loading products', props<{ error: string}>());