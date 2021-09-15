import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import { Product } from "../product";

import * as AppState from '../../state/app.state';
import * as productActions from './product.actions';

export interface State extends AppState.State {
    products: ProductState
}

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    currentProductId: number;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    currentProduct: null,
    products: [],
    error: '',
};

export const productReducer = createReducer<ProductState>(
    initialState,
    on(productActions.toggleProductCode,
        (state): ProductState => ({ ...state, showProductCode: !state.showProductCode })),
    on(productActions.setCurrentProduct, (state, action): ProductState => ({
        ...state,
        currentProduct: action.product
    })),
    on(productActions.clearCurrentProduct, state => ({
        ...state,
        currentProduct: null,
    })),
    on(productActions.initCurrentProduct, state => ({
        ...state,
        currentProduct: {
            id: 0,
            productName: '',
            productCode: 'New',
            description: '',
            starRating: 0
          }
    })),
    on(productActions.loadedProducts, (state, action): ProductState => ({
        ...state,
        products: action.products,
        error: initialState.error,
    })),
    on(productActions.errorLoadingProducts, (state, action): ProductState => ({
        ...state,
        products: initialState.products,
        error: action.error
    }))
)

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(getProductFeatureState, state => state.showProductCode);
export const getCurrentProductId = createSelector(getProductFeatureState, state => state.currentProductId);
export const getCurrentProduct = createSelector(getProductFeatureState, state => state.currentProduct);
export const getProducts = createSelector(getProductFeatureState, state => state.products);
export const getLoadProductError = createSelector(getProductFeatureState, state => state.error);