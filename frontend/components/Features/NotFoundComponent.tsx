const NotFoundComponent = ({ message }: { message: string }) => {
  return (
    <div className="flexCenter h-[calc(100vh-50px)] w-full text-2xl">
      {message}
    </div>
  )
}

export default NotFoundComponent
