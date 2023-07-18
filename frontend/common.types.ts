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

type Section = {
  _id: string
  title: string
  duration: string
}

export type CourseType = {
  _id?: string
  name: string
  description: string
  courseImg: string
  duration: string
  price: string
  sections?: Section[]
}

export type SectionType = {
  _id?: string
  title: string
  duration: string
  courseId?: string
}
export type LessonType = {
  _id?: string
  title: string
  duration: string
  material?: string
  video?: string
  sectionId?: string
}
