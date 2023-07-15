export type UserType = {
  name: string
  email: string
  phone: string
  parentsPhone: string
  gender: string
  grade: string
  city: string
  role: string
}
export interface UserState {
  user: UserType | null
}

export enum UserActionTypes {
  SET_USER = "SET_USER",
  CLEAR_USER = "CLEAR_USER",
}
