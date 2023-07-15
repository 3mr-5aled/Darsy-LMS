"use client"
import React, { createContext, useContext, useReducer } from "react"
import { userReducer, initialState, UserAction } from "@/reducers/userReducer"
import { UserActionTypes, UserState, UserType } from "@/common.types"

export interface UserContextType {
  state: UserState
  dispatch: React.Dispatch<UserAction>
  setUser: (user: UserType | null) => void
  clearUser: () => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  const setUser = (user: UserType | null) => {
    dispatch({ type: UserActionTypes.SET_USER, payload: user })
  }

  const clearUser = () => {
    dispatch({ type: UserActionTypes.CLEAR_USER })
  }

  return (
    <UserContext.Provider value={{ state, dispatch, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider")
  }
  return context
}
