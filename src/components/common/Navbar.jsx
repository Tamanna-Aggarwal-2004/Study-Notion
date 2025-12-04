import { useEffect, useState } from "react"
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineClose,
} from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => matchPath({ path: route }, location.pathname)

  return (
    <div
      className={`flex h-14 items-center justify-center border-b border-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200 relative z-[1000]`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : (subLinks && subLinks.length) ? (
                        <>
                          {subLinks
                            ?.filter(
                              (subLink) => subLink?.courses?.length > 0
                            )
                            ?.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                key={i}
                              >
                                <p>{subLink.name}</p>
                              </Link>
                            ))}
                        </>
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-x-4">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-yellow-400 text-[10px] font-bold text-richblack-900">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null ? (
            <>
              <Link to="/login">
                <button className="rounded-lg border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 hover:bg-richblack-700">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-lg border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 hover:bg-richblack-700 transition-all">
                  Sign up
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropdown />
          )}
        </div>

        {/* Mobile Right Section */}
        <div className="flex items-center gap-x-3 md:hidden">
          {/* Cart just before menu */}
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-4 w-4 place-items-center rounded-full bg-yellow-400 text-[10px] font-bold text-richblack-900">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* Menu Button */}
          <button
            className="text-richblack-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <AiOutlineClose fontSize={26} />
            ) : (
              <AiOutlineMenu fontSize={26} />
            )}
          </button>
        </div>
      </div>

      {/* ✅ Right Side Drawer (Visible in small screens) */}
      <div
        className={`absolute top-14 right-0 w-[40%] sm:w-[40%] bg-richblack-900/95 backdrop-blur-lg border-l border-richblack-700 shadow-2xl rounded-l-2xl p-6 md:hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-5 text-richblack-25 text-base font-medium">
          {NavbarLinks.map((link, index) => (
            <li key={index} className="w-full text-center">
              {link.title === "Catalog" ? (
                <details className="group">
                  <summary className="flex items-center justify-center gap-1 cursor-pointer hover:text-yellow-25">
                    {link.title}
                    <BsChevronDown className="group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mt-2 flex flex-col gap-2 bg-richblack-800 rounded-md py-2">
                    {subLinks?.length ? (
                      subLinks
                        .filter((s) => s?.courses?.length > 0)
                        .map((s, i) => (
                          <div key={i}>
                            <Link
                              to={`/catalog/${s.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              onClick={() => setMenuOpen(false)}
                              className="text-[13px] hover:text-yellow-25 transition-all block "
                            >
                              {s.name}
                            </Link>
                            {/* ✨ Partition line */}
                            {i !== subLinks.length - 1 && (
                              <hr className="border-t border-richblack-600/70 my-1 w-4/5 mx-auto" />
                            )}
                          </div>
                        ))
                    ) : (
                      <p className="text-sm text-richblack-400">
                        No Courses Found
                      </p>
                    )}
                  </div>
                </details>
              ) : (
                <Link
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block ${
                    matchRoute(link.path)
                      ? "text-yellow-25 font-semibold"
                      : "hover:text-yellow-25"
                  }`}
                >
                  {link.title}
                </Link>
              )}
            </li>
          ))}

          {/* ✅ Profile Dropdown added for small screen */}
          {token && (
            <div className="w-full flex justify-center mt-3">
              <ProfileDropdown />
            </div>
          )}

          {/* Auth Buttons */}
          {token === null && (
            <div className="flex flex-col gap-3 w-[85%]">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button className="w-full rounded-lg border border-richblack-700 bg-richblack-900 py-2 text-richblack-100 hover:bg-richblack-700">
                  Log in
                </button>
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <button className="w-full rounded-lg border border-yellow-50 bg-yellow-50 text-richblack-900 font-semibold py-2 hover:opacity-90">
                  Sign up
                </button>
              </Link>
            </div>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
