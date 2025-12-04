import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"
import CoursesTable from "./InstructorCourses/CoursesTable"

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
  }, [token])

  return (
    <div className="w-full overflow-x-hidden">
      {/* Header Section */}
      <div className="mb-10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-medium text-richblack-5">
          My Courses
        </h1>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>

      {/* Courses Table (Responsive Scrollable) */}
      <div className="w-full overflow-x-auto">
        {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
      </div>
    </div>
  )
}
