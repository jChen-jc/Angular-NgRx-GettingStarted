import { createAction, createReducer, on } from "@ngrx/store";

const initialSate = {
    showProductCode: true,
}

export const productReducer = createReducer(
    initialSate,
    on(createAction('[Product] toggle product code'),
        state => ({ ...state, showProductCode: !state.showProductCode }))
)