import Link from "next/link"

export default function NotFoundPage() {
  return (
    <div className="w-full h-screen flexCenter bg-base-100">
      <div className="flex-col gap-5 p-5 flexCenter card bg-base-300">
        <div className="text-5xl font-extrabold">Page not found - 404</div>
        <Link href="/" className="btn btn-primary">
          Back to Homepage
        </Link>
      </div>
    </div>
  )
}
