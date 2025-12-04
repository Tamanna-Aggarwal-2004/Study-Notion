import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <div className="w-full overflow-x-hidden">
      {/* Heading */}
      <div className="mb-14 flex items-center justify-between flex-wrap">
        <h1 className="text-3xl font-medium text-richblack-5 break-words">
          My Profile
        </h1>

        {/* ✅ Single Edit Button visible only on small screens */}
        <div className="block sm:hidden mt-4 sm:mt-0">
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </div>

      {/* Section 1 - Profile Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-md border border-richblack-700 bg-richblack-800 p-6 sm:p-8 sm:px-12 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-x-4 gap-y-3 text-center sm:text-left w-full break-words">
          {/* Profile Image */}
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[90px] sm:w-[78px] rounded-full object-cover flex-shrink-0"
          />

          {/* Name + Email */}
          <div className="space-y-1 w-full break-words">
            <p className="text-lg font-semibold text-richblack-5 break-words">
              {user?.firstName + " " + user?.lastName}
            </p>

            {/* ✅ Email always visible, smaller on mobile */}
            <p className="text-xs sm:text-sm text-richblack-300 opacity-90 break-all">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Hidden on small screens */}
        <div className="hidden sm:block flex-shrink-0">
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </div>

      {/* Section 2 - About */}
      <div className="my-5 flex flex-col gap-y-10 rounded-md border border-richblack-700 bg-richblack-800 p-6 sm:p-8 sm:px-12 overflow-hidden">
        <div className="flex items-center justify-between w-full flex-wrap">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <div className="hidden sm:block flex-shrink-0">
            <IconBtn
              text="Edit"
              onclick={() => navigate("/dashboard/settings")}
            >
              <RiEditBoxLine />
            </IconBtn>
          </div>
        </div>

        <p
          className={`break-words ${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>

      {/* Section 3 - Personal Details */}
      <div className="my-5 flex flex-col gap-y-10 rounded-md border border-richblack-700 bg-richblack-800 p-6 sm:p-8 sm:px-12 overflow-hidden">
        <div className="flex items-center justify-between w-full flex-wrap">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <div className="hidden sm:block flex-shrink-0">
            <IconBtn
              text="Edit"
              onclick={() => navigate("/dashboard/settings")}
            >
              <RiEditBoxLine />
            </IconBtn>
          </div>
        </div>

        {/* ✅ Details Section */}
        <div className="flex flex-wrap sm:flex-nowrap justify-between max-w-full gap-6 sm:gap-0">
          {/* Left Column */}
          <div className="flex flex-col gap-y-5 w-full sm:w-1/2 break-words">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5 break-words">
                {user?.firstName}
              </p>
            </div>

            {/* 👇 Last Name below First Name on mobile */}
            <div className="block sm:hidden">
              <p className="mb-2 mt-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5 break-words">
                {user?.lastName}
              </p>
            </div>

            {/* 👇 Gender */}
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5 break-words">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>

            {/* 👇 Email — only visible here on large screens */}
            <div className="hidden sm:block">
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5 break-all">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="hidden sm:flex flex-col gap-y-5 w-full sm:w-1/2 break-words">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5 break-words">
                {user?.lastName}
              </p>
            </div>

            {/* 👇 Contact Number */}
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5 break-words">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>

            {/* 👇 Date of Birth */}
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5 break-words">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>

          {/* 👇 On mobile, show contact + DOB below */}
          <div className="flex sm:hidden flex-col gap-y-5 w-full break-words">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Contact Number</p>
              <p className="text-sm font-medium text-richblack-5 break-words">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5 break-words">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
