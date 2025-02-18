import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import { Product } from "../product";

import * as AppState from '../../state/app.state';
import * as productActions from './product.actions';

export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: '',
};

export const productReducer = createReducer<ProductState>(
    initialState,
    on(productActions.toggleProductCode,
        (state): ProductState => ({ ...state, showProductCode: !state.showProductCode })),
    on(productActions.setCurrentProduct, (state, action): ProductState => ({
        ...state,
        currentProductId: action.currentProductId
    })),
    on(productActions.clearCurrentProduct, (state): ProductState => ({
        ...state,
        currentProductId: null,
    })),
    on(productActions.initCurrentProduct, (state): ProductState => ({
        ...state,
        currentProductId: 0
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
    })),
    on(productActions.updateProductSuccess, (state, action): ProductState => ({
        ...state,
        products: state.products.map(product => {
            if (product.id === action.product.id) {
                return action.product;
            }
            return product;
        }),
        currentProductId: action.product.id,
        error: initialState.error
    })),
    on(
        productActions.updateProductFailure,
        productActions.createProductFailure,
        productActions.removeProductFailure,
        (state, action): ProductState => ({
        ...state,
        error: action.error
    })),
    on(productActions.createProductSuccess, (state, action): ProductState => ({
        ...state,
        products: state.products.concat(action.product),
        currentProductId: action.product.id,
        error: initialState.error
    })),
    on(productActions.removeProductSuccess, (state, action): ProductState => ({
        ...state,
        products: state.products.filter(product => product.id !== action.productId),
        currentProductId: null,
        error: initialState.error
    })),
)
