import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-stars"
import { useDispatch, useSelector } from "react-redux"

import { removeFromCart } from "../../../../slices/cartSlice"

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  // ⭐ Function to get average rating
  const getAverageRating = (ratingArr) => {
    if (!ratingArr || ratingArr.length === 0) return 0

    const total = ratingArr.reduce((acc, curr) => acc + Number(curr.rating), 0)
    return total / ratingArr.length
  }

  return (
    <div className="flex flex-1 flex-col">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className={`flex w-full flex-wrap items-start justify-between gap-6 ${
            indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
          } ${indx !== 0 && "mt-6"} `}
        >
          <div className="flex flex-1 flex-col gap-4 xl:flex-row">
            <img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="h-[148px] w-[220px] rounded-lg object-cover"
            />

            <div className="flex flex-col space-y-1">
              <p className="text-lg font-medium text-richblack-5">
                {course?.courseName}
              </p>

              <p className="text-sm text-richblack-300">
                {course?.category?.name}
              </p>

              {/* ⭐ Real rating number + stars + rating count */}
              <div className="flex items-center gap-2">
                {/* Average Rating Number */}
                <span className="text-yellow-5 font-semibold">
                  {getAverageRating(course?.ratingAndReviews).toFixed(1)}
                </span>

                {/* Average Rating Stars */}
                <ReactStars
                  count={5}
                  value={getAverageRating(course?.ratingAndReviews)}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />

                {/* Total Ratings Count */}
                <span className="text-richblack-400 text-sm">
                  {course?.ratingAndReviews?.length} Ratings
                </span>
              </div>
            </div>
          </div>

          {/* PRICE + REMOVE BUTTON */}
          <div className="flex flex-col items-end space-y-2">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>

            <p className="mb-6 text-3xl font-medium text-yellow-100">
              ₹ {course?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
