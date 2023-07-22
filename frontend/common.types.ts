export type UserType = {
  _id: string
  name: string
  email: string
  phone: string
  parentsPhone: string
  gender: string
  grade: string
  city: string
  dateOfBirth: string
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
  image: string
  courseImg?: string | undefined
  duration: number
  price: number
  discount?: number
  sections?: Section[]
}

export type SectionType = {
  _id?: string
  title: string
  duration: string
  courseId?: string
}

export type Material = {
  name: string
  link: string
}

export type VideoType = "normal" | "youtube"

export interface LessonType {
  _id?: string
  title: string
  video?: {
    src: string
    provider: VideoType
  }
  file: any
  videotype: string
  duration: string
  description: string
  material?: {
    name: string
    link: string
  }
  courseId?: string
  sectionId?: string
  exams?: {
    question: string
    answers: string[]
    correctAnswer: string
  }[]
}
