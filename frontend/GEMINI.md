# Darsy LMS Frontend

A modern Learning Management System (LMS) frontend built with Next.js 14, providing a seamless educational experience for students and robust management tools for administrators.

## Project Overview

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + DaisyUI (with custom "mytheme" and dark mode support)
- **State Management**: React Context API + `useReducer` for global user state
- **API Interaction**: Axios with custom interceptors for base URL and CSRF handling
- **Media Management**: Cloudinary (`next-cloudinary`) and AWS S3 (`@aws-sdk/client-s3`)
- **Key Libraries**: React Hook Form, Chart.js, Plyr, Swiper, React Quill, React Toastify

### Architecture

The project follows the Next.js App Router structure:
- `app/`: Contains all routes, layouts, and global styles. Note the `app/app/` subdirectory which serves as the main learning/dashboard interface.
- `components/`: Categorized UI components:
  - `admin/`: Admin-specific cards and sidebars.
  - `course/`: Course viewing, lessons, and quiz components.
  - `learn/`: Components for the student learning interface.
  - `Forms/`: Complex form inputs, including Cloudinary and S3 uploaders.
  - `Routes/`: Route guards (e.g., `AdminOnlyRoutes`, `PremiumOnlyRoute`).
- `constant/`: Centralized site data, navigation links, and select options (e.g., cities, grades).
- `contexts/` & `reducers/`: Global state management for authentication and user profiles.
- `lib/`: Shared utility functions, HOCs, and data-fetching helpers.

## Building and Running

### Development
```bash
npm run dev
```
Starts the development server on [http://localhost:8080](http://localhost:8080) with Next.js Turbo enabled.

### Production
```bash
npm run build
npm run start
```
Builds the application for production and starts the server on port 8080.

### Quality Tools
```bash
npm run lint
```
Runs ESLint to check for code quality and style issues.

## Development Conventions

- **Next.js App Router**: Strictly follow App Router patterns. Use `"use client"` at the top of files that use hooks, state, or browser APIs.
- **Styling**: Prefer Tailwind utility classes. Utilize DaisyUI components for consistent UI elements (buttons, modals, drawers).
- **API Calls**: Always use the pre-configured `axiosInstance` from `@/axios.config` for backend interactions.
- **State**: Use `useUserContext` from `@/contexts/userContext` to access or modify the global user state.
- **Internationalization**: The project defaults to Arabic (`lang="ar"`). Ensure new text components are compatible or localized as needed.
- **Media Uploads**: 
  - Use `UploadImageButton` and `UploadVideoButton` (Cloudinary) for most media.
  - Use `AwsUploader` for direct S3 uploads where specified.
- **SEO**: Update `metadata` in `layout.tsx` or individual `page.tsx` files. Site constants are managed in `constant/index.ts`.

## Deployment

The application is configured for deployment on platforms like Vercel or Render.
- **Backend Base URL**: Managed in `axios.config.ts` via `NODE_ENV` checks.
- **Environment Variables**: Ensure `NEXT_PUBLIC_BACKEND_PORT` and other secrets are configured in the deployment environment.
