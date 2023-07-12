export type RegisterFormState = {
  name: string
  avatar: string
  gender: string
  phone: string
  dateOfBirth: string
  city: string
  email: string
  password: string
  confirmPassword: string
}
export type LoginFormState = {
  email: string
  password: string
}

export interface ProjectInterface {
  title: string
  description: string
  image: string
  liveSiteUrl: string
  githubUrl: string
  category: string
  id: string
  createdBy: {
    name: string
    email: string
    avatarUrl: string
    id: string
  }
}

export interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  gender: string
  phone: string
  dateOfBirth: string
  city: string
}

// export interface SessionInterface extends Session {
//   user: User & {
//     id: string
//     name: string
//     email: string
//     avatarUrl: string
//   }
// }

export interface ProjectForm {
  title: string
  description: string
  image: string
  liveSiteUrl: string
  githubUrl: string
  category: string
}
