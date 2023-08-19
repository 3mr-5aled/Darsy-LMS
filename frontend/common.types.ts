export type EnrolledCourse = {
  courseId: string
  lessonsDone: string[]
  name: string
  lessonTotal: number
  courseImg: string
  _id: string
}

export interface userDegrees {
  degree: number
  lessonTitle: string
  examDate: Date
  lessonId: string
}
export interface userCourses {
  name: string
  courseId: string
  courseImg: string
  progress: number
}
export interface userOrders {
  userId: {
    _id: string
    name: string
  }
  createdAt: string
  _id: string
  adminId?: {
    _id: string
    name: string
  }
  amount: string
  courseId?: {
    _id: string
    name: string
  }
  tran_ref?: string
  status: string
  type: string
}

export interface UserType {
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
  enrolledCourse: {
    courseId: string
    lessonsDone: string[]
    name: string
    lessonTotal: number
    courseImg: string
    _id: string
  }[]
  createdAt: string
  updatedAt: string
  __v: number
  exams: {
    lessonId: string
    degree: string
    createdAt: string
    _id: string
  }[]
  lastLesson: string
  nextLesson: string
  credit: number
  membership: {
    expireTime: Date
    name: string
    memberId: string
  }
  forgetpasswordcode: string
  forgetpasswordexpired: string
  forgetpasswordvalidation: boolean
  lastSignedIn?: string
}

export interface UserState {
  user: UserType | null
  loading: boolean
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
  appearenceDate: number
  isShown: boolean
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

export type SectionType = {
  _id?: string
  title: string
  duration: string
  courseId?: string
  lessons: LessonType[]
  total: number
}

export type Material = {
  name: string
  link: string
}

export interface LessonType {
  _id: string
  index: number
  timer: number
  title: string
  video: {
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
  material?:
    | {
        name: string
        link: string
      }
    | undefined
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
  isCheckBoxQuiz: boolean
}

export type ApiResponseType = {
  lesson: LessonType
  sections: SectionType[]
  sectionTitle: string
  sectionDuration: string
  courseTitle: string
  course: CourseType
  totalLessons: number
}
