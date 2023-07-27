interface EnrolledCourse {
  courseId: string
  name: string
  courseImg: string
  duration: number
  lessonsDone: string[]
  nextLesson: string
  expiredDate: Date
  lessonTotal: string
}

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
  enrolledCourse: EnrolledCourse[]
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
  lessons: string[]
}

export type CourseType = {
  _id?: string
  name: string
  description: string
  // image: string
  grade: string
  courseImg: {
    src: string
    publicId: string
    fileName: string
  }
  duration: number
  price: number
  discount: number
  total?: number
  sections?: Section[]
}
export type CoursesType = {
  courses: CourseType[]
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

export interface LessonType {
  _id?: string
  title: string
  video?: {
    publicId: string
    fileName: string
    src: string
    provider: "normal" | "youtube"
  }
  file: any
  videotype: string
  youtubelink: string
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
