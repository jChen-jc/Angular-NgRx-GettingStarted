import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import * as AppState from '../../state/app.state';
import { ProductState } from "./product.reducer";

export interface State extends AppState.State {
    products: ProductState
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(getProductFeatureState, state => state.showProductCode);
export const getCurrentProductId = createSelector(getProductFeatureState, state => state.currentProductId);
export const getProducts = createSelector(getProductFeatureState, state => state.products);
export const getLoadProductError = createSelector(getProductFeatureState, state => state.error);

export const getCurrentProduct = createSelector(getProductFeatureState, getCurrentProductId, (state, currentId) => {
    if (currentId === 0) {
        return {
            id: 0,
            productName: '',
            productCode: 'New',
            description: '',
            starRating: 0
        }
    }

    console.log(" state.products",  state.products, currentId)
    return currentId ? state.products.find(product => product.id === currentId) : null;
});
