import { UserActionTypes, UserState, UserType } from "@/common.types"

export const initialState: UserState = {
  user: null,
  loading: true, // Add a loading property
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
        loading: false, // Set loading to false when user data is fetched
      }
    case UserActionTypes.CLEAR_USER:
      return {
        ...state,
        user: null,
        loading: false, // Set loading to false when user data is cleared
      }
    default:
      return state
  }
}

export type UserAction =
  | { type: UserActionTypes.SET_USER; payload: UserType | null }
  | { type: UserActionTypes.CLEAR_USER }
