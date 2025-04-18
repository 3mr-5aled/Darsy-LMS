import React, { useEffect } from "react"
import "swiper/css" // Import Swiper CSS
import Swiper from "swiper" // Import Swiper library
import { Owner } from "@/constant"

const Testimonials = () => {
  useEffect(() => {
    // Initialize Swiper when the component mounts
    const swiper = new Swiper(".swiper-container", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 32,
      autoplay: true,
      breakpoints: {
        640: {
          centeredSlides: true,
          slidesPerView: 1.25,
        },
        1024: {
          centeredSlides: false,
          slidesPerView: 1.5,
        },
      },
      navigation: {
        nextEl: ".next-button", // Use class name
        prevEl: ".prev-button", // Use class name
      },
    })

    // Optional: Add event listeners for the buttons
    const nextButton = document.querySelector("#next")
    const nextButton2 = document.querySelector("#next2")
    const prevButton = document.querySelector("#prev")
    const prevButton2 = document.querySelector("#prev2")

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        swiper.slideNext()
      })
    }
    if (nextButton2) {
      nextButton2.addEventListener("click", () => {
        swiper.slideNext()
      })
    }

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        swiper.slidePrev()
      })
    }
    if (prevButton2) {
      prevButton2.addEventListener("click", () => {
        swiper.slidePrev()
      })
    }
  }, [])

  return (
    <div>
      <section className="bg-base-100 container">
        <div className="mx-auto max-w-[1340px] px-4 py-16 sm:px-6 sm:py-24 lg:me-0 lg:pe-0 lg:ps-8">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:items-center lg:gap-x-16">
            <div className="max-w-xl text-start ltr:sm:text-left rtl:sm:text-right">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {Owner.WebsiteDetails.testimonials.heading1}
                <br className="hidden sm:block lg:hidden" />
                {Owner.WebsiteDetails.testimonials.heading2}
              </h2>

              <p className="mt-4 text-gray-500">
                {Owner.WebsiteDetails.testimonials.description}
              </p>

              <div className="hidden lg:mt-8 lg:flex lg:justify-start lg:gap-4">
                <button
                  id="prev"
                  className="p-3 text-pink-600 border border-pink-600 rounded-full prev-button hover:bg-pink-600 hover:text-white"
                >
                  <span className="sr-only">Previous Slide</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 rtl:rotate-180"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>

                <button
                  id="next"
                  className="p-3 text-pink-600 border border-pink-600 rounded-full next-button hover:bg-pink-600 hover:text-white"
                >
                  <span className="sr-only">Next Slide</span>
                  <svg
                    className="w-5 h-5 rtl:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="-mx-6 lg:col-span-2 lg:mx-0">
              <div className="swiper-container !overflow-hidden">
                <div className="swiper-wrapper">
                  {Owner.WebsiteDetails.testimonials.testimonialsData.map(
                    (testimonial, index) => (
                      <div key={index} className="swiper-slide">
                        <blockquote className="flex flex-col justify-between h-full p-12 bg-base-200 shadow-xl">
                          <div>
                            <div className="flex gap-0.5 text-green-500">
                              {[...Array(testimonial.rating)].map(
                                (_, ratingIndex) => (
                                  <svg
                                    key={ratingIndex}
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                )
                              )}
                            </div>

                            <div className="mt-4">
                              <p className="text-2xl font-bold text-pink-600 sm:text-3xl">
                                {testimonial.subject}
                              </p>

                              <p className="mt-4 leading-relaxed text-gray-500">
                                {testimonial.quote}
                              </p>
                            </div>
                          </div>

                          <footer className="mt-8 text-sm text-gray-500">
                            &mdash; {testimonial.name}
                          </footer>
                        </blockquote>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="flex lg:hidden justify-center gap-4">
              <button
                id="prev2"
                className="p-3 text-pink-600 border border-pink-600 rounded-full prev-button hover:bg-pink-600 hover:text-white"
              >
                <span className="sr-only">Previous Slide</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 rtl:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <button
                id="next2"
                className="p-3 text-pink-600 border border-pink-600 rounded-full next-button hover:bg-pink-600 hover:text-white"
              >
                <span className="sr-only">Next Slide</span>
                <svg
                  className="w-5 h-5 rtl:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Testimonials
