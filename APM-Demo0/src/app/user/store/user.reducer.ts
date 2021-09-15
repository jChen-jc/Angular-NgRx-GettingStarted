import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { User } from '../user';

export interface UserState {
  userName: string;
  maskUserName: boolean,
  currentUser: User
}

const initialSate = {
  maskUserName: false
}

export const toggleMaskUsername = createAction('[User] toggle mask username');

export const userReducer = createReducer(
    initialSate,
    on(toggleMaskUsername, state => {
        console.log("state", state)
        return {
            ...state,
            maskUserName: !state.maskUserName,
        }
    })
)

const userFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUsername = createSelector(userFeatureState, state => state.maskUserName);
export const getCurrentUser = createSelector(userFeatureState, state => state.currentUser);

