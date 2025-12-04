import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import IconBtn from "../../common/IconBtn"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    ;(() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
  }, [courseSectionData, courseEntireData, location.pathname, sectionId, subSectionId])

  return (
    <div
      className="flex flex-col border-r border-richblack-700 bg-richblack-800
                 h-[calc(100vh-3.5rem)]  sm:w-[300px] md:w-[320px] lg:max-w-[350px]
                 overflow-hidden"
    >
      {/* Header */}
      <div className="mx-3 sm:mx-5 flex flex-col gap-3 border-b border-richblack-600 py-4 sm:py-5 text-base sm:text-lg font-bold text-richblack-25">
        <div className="flex w-full items-center justify-between gap-3 sm:gap-0">
          <div
            onClick={() => navigate(`/dashboard/enrolled-courses`)}
            className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90 cursor-pointer"
            title="back"
          >
            <IoIosArrowBack size={26} />
          </div>

          <IconBtn
            text="Add Review"
            customClasses="ml-auto"
            onclick={() => setReviewModal(true)}
          />
        </div>

        <div className="flex flex-col">
          <p className="text-[15px] sm:text-base md:text-lg truncate">
            {courseEntireData?.courseName}
          </p>
          <p className="text-xs sm:text-sm font-semibold text-richblack-500">
            {completedLectures?.length} / {totalNoOfLectures}
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-richblack-700 scrollbar-track-richblack-800">
        {courseSectionData.map((course, index) => (
          <div
            className="mt-1 sm:mt-2 cursor-pointer text-xs sm:text-sm text-richblack-5"
            onClick={() => setActiveStatus(course?._id)}
            key={index}
          >
            {/* Section Title */}
            <div className="flex justify-between items-center bg-richblack-600 px-3 sm:px-5 py-3 sm:py-4">
              <div className="font-semibold w-[75%] truncate text-[13px] sm:text-[15px]">
                {course?.sectionName}
              </div>
              <div
                className={`transition-transform duration-500 ${
                  activeStatus === course?._id ? "rotate-0" : "rotate-180"
                }`}
              >
                <BsChevronDown />
              </div>
            </div>

            {/* Sub Sections */}
            {activeStatus === course?._id && (
              <div className="transition-[height] duration-500 ease-in-out">
                {course.subSection.map((topic, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 sm:gap-3 items-center px-3 sm:px-5 py-2 sm:py-3 text-[12px] sm:text-sm ${
                      videoBarActive === topic._id
                        ? "bg-yellow-200 font-semibold text-richblack-800"
                        : "hover:bg-richblack-900"
                    }`}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                      )
                      setVideoBarActive(topic._id)
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic?._id)}
                      onChange={() => {}}
                      className="w-3 h-3 sm:w-4 sm:h-4"
                    />
                    <span className="truncate">{topic.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
