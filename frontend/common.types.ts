export type EnrolledCourse = {
  courseId: string
  lessonsDone: string[]
  name: string
  lessonTotal: number
  courseImg: string
  _id: string
}

export type UserType = {
  _id: string
  name: string
  email: string
  city: string
  parentsPhone: string
  phone: string
  dateOfBirth: string
  role: string
  gender: string
  grade: string
  enrolledCourse: EnrolledCourse[]
  createdAt: string
  updatedAt: string
  __v: number
  exams: any[] // You can replace 'any[]' with a more specific type if you know the structure of the 'exams' property.
  lastLesson: string
  nextLesson: string
  credit: number
  isMemberShip:
    | {
        _id: string
        name: string
      }
    | false
  forgetpasswordcode: string
  forgetpasswordexpired: string
  forgetpasswordvalidation: boolean
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

export type MembershipType = {
  _id?: string
  name: string
  grade: string
  expiredTime: number
  discount: number
  description: string
  price: number
  userId?: string[]
  disabled: boolean
}

export type AnalyticsData = {
  allMoney: number
  todayMoney: number
  todaySignedInStudents: number
  enrolledStudents: number
  studentsInMembership: number
  studentsWithNoMembership: number
  studentsWithNoEnrolledCourse: number
}

interface Answer {
  text: string
  image: File | null
}

export interface Question {
  question: string
  questionImage: File | null
  answers: Answer[]
  correctAnswer: string[] // Array of answer texts
  isCheckboxQuiz: boolean
}
