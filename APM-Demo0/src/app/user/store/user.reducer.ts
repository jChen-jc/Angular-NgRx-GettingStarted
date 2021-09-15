import { createAction, createReducer, on } from "@ngrx/store";

const initialSate = {
    showMaskUserName: false
}

export const userReducer = createReducer(
    initialSate,
    on(createAction('[User] toggle mask username'), state => {
        console.log("state", state)
        return {
            ...state,
            showMaskUserName: !state.showMaskUserName,
        }
    })
)