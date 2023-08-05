export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flexCenter h-[calc(100vh-50px)] w-full min-w-96">
      {/* <span className="loading loading-spinner loading-lg"></span> */}
      <div className="loader">
        <div className="pencil">
          <p>Loading...</p>
          <div className="top"></div>
        </div>
        <div className="stroke"></div>
      </div>
    </div>
  )
}
