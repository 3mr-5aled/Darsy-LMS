import { UserActionTypes, UserState, UserType } from "@/common.types"

export const initialState: UserState = {
  user: null,
}

export const userReducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      }
    case UserActionTypes.CLEAR_USER:
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

export type UserAction =
  | { type: UserActionTypes.SET_USER; payload: UserType | null }
  | { type: UserActionTypes.CLEAR_USER }
