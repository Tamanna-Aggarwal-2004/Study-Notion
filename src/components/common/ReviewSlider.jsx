import React, { useEffect, useState } from "react"
import ReactStars from "react-stars"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"

import { FaStar } from "react-icons/fa"
import { Autoplay, FreeMode, Pagination } from "swiper"

import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const [expandedIndex, setExpandedIndex] = useState(null)
  const truncateWords = 15

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )
        if (data?.success) {
          setReviews(data?.data)
        }
      } catch (error) {
        console.error("Error fetching reviews:", error)
      }
    })()
  }, [])

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="text-white w-full">
      <div className="my-[50px] w-full max-w-maxContentTab lg:max-w-maxContent px-4">
        <Swiper
          centeredSlides={true}
          freeMode={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={25}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 25 },
            1280: { slidesPerView: 4, spaceBetween: 30 },
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full mySwiper !overflow-visible"
        >
          {reviews.map((review, i) => {
            const ratingNumber = Number(review?.rating) || 0
            const words = review?.review.split(" ")

            const truncatedReview =
              words.length > truncateWords
                ? words.slice(0, truncateWords).join(" ") + "..."
                : review?.review

            const showFullReview = expandedIndex === i

            return (
              <SwiperSlide key={i} className="flex justify-center">
                <div className="w-[280px] md:w-[300px] lg:w-[320px] flex flex-col gap-3 bg-richblack-800 p-4 rounded-xl text-[14px] text-richblack-25 min-h-[230px] shadow-md hover:shadow-lg transition-all duration-300">
                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-10 w-10 rounded-full object-cover border border-richblack-700"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>

                  

                  {/* Show More / Show Less Button */}
                 <p className="font-medium text-richblack-25 leading-relaxed">
                  {showFullReview ? review?.review : truncatedReview}
                  {words.length > truncateWords ? (
                    <span
                      onClick={() => toggleExpand(i)}
                      className="text-yellow-200 cursor-pointer font-semibold hover:text-yellow-300 ml-1"
                    >
                      {showFullReview ? "Show Less" : "Show More"}
                    </span>
                  ) : null}
                </p>
                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-auto">
                    <h3 className="font-semibold text-yellow-100">
                      {ratingNumber.toFixed(1)}
                    </h3>

                    <ReactStars
                      count={5}
                      value={ratingNumber}
                      size={18}
                      edit={false}
                      color2="#ffd700"
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider
