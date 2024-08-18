import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faGraduationCap,
  faBriefcase,
  faUserGraduate,
  faChalkboardTeacher,
  faUser,
  faUserCircle,
  fas,
  faHome,
  faFileAlt,
  faBuilding,
  faUniversity,
  faEnvelope,
  faPenNib,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/js/dist/dropdown";

export default function Authenticated({ user, header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);
  const [showSubNav, setShowSubNav] = useState(false);
  const [showSubjectSubNav, setShowSubjectSubNav] = useState(false);
  const [showTeacherSubNav, setShowTeacherSubNav] = useState(false);
  const [showSemesterSubNav, setShowSemesterSubNav] = useState(false);
  const [showMarksSubNav, setShowMarksSubNav] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const { usertype } = usePage().props;
  const { departments } = usePage().props;

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <nav className="bg-gray-200 dark:bg-gray-600 border-b border-gray-200 dark:border-gray-700 fixed offset-2 col-10">
          <div className="max-w-8xl  mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="flex justify-between h-20">
              <div className="flex">
                <div className="shrink-0 flex items-center">
                  <Link href="">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-red-600 dark:text-gray-200 bg-gray-200" />
                  </Link>
                </div>
              </div>

              {header && (
                <header className="bg-gray-200 dark:bg-gray-600 text-start max-w-9xl  ms-40">
                  <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {header}
                  </div>
                </header>
              )}

              <div className="hidden  sm:flex sm:items-center sm:ms-6">
                <div className="ms-3 relative">
                  <Dropdown>
                    <Dropdown.Trigger>
                      <span className="inline-flex rounded-md">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                        >
                          {user.name}

                          <svg
                            className="ms-2 -me-0.5 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                      <Dropdown.Link href={route("profile.edit")}>
                        Profile
                      </Dropdown.Link>
                      <Dropdown.Link
                        href={route("logout")}
                        method="post"
                        as="button"
                      >
                        Log Out
                      </Dropdown.Link>
                    </Dropdown.Content>
                  </Dropdown>
                </div>
              </div>

              <div className="-me-2 flex items-center sm:hidden">
                <button
                  onClick={() =>
                    setShowingNavigationDropdown(
                      (previousState) => !previousState
                    )
                  }
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className={
                        !showingNavigationDropdown ? "inline-flex" : "hidden"
                      }
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                    <path
                      className={
                        showingNavigationDropdown ? "inline-flex" : "hidden"
                      }
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div
            className={
              (showingNavigationDropdown ? "block" : "hidden") + " sm:hidden"
            }
          >
            <div className="pt-2 pb-3 space-y-1">
              <ResponsiveNavLink
                href={route("dashboard")}
                active={route().current("dashboard")}
              >
                Dashboard
              </ResponsiveNavLink>
            </div>

            <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
              <div className="px-4">
                <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                  {user.name}
                </div>
                <div className="font-medium text-sm text-gray-500">
                  {user.email}
                </div>
              </div>

              <div className="mt-3 space-y-1">
                <ResponsiveNavLink href={route("profile.edit")}>
                  Profile
                </ResponsiveNavLink>
                <ResponsiveNavLink
                  method="post"
                  href={route("logout")}
                  as="button"
                >
                  Log Out
                </ResponsiveNavLink>
              </div>
            </div>
          </div>
        </nav>

        <div className="row content flex">
          <aside
            className= "container-fluid wrap-content shadow col-2 fixed  left-0 top-0 w-1/5 " dir="" >
            <div className="row ">
              <div
                className="bg-blue-600 d-flex flex-column justify-content-between min-vh-100 "
              >
                <div className="mt-2">

                  <a
                    className="text-decoration-none d-flex align-items-center text-white d-none d-sm-inline"
                    role="button"
                  >
                    <span className="f5-4 ms-5">{user.name}</span>
                  </a>
                  <hr className="text-white d-none d-sm-block"></hr>

                  {usertype == 1 ? (
                    <ul className="nav nav-pills flex-column  mt-2 mt-sm-0 ">
                      <li className="nav-item  my-1 mb-0 py-2  py-sm-0 hover:bg-blue-700">
                        <a
                          className="nav-link nav-link-hover text-white text-center text-sm-start "
                          aria-current="page"
                        >
                          <i className="bi bi-speedometer2 ms-2"></i>
                          <span className="ms-2 d-none d-sm-inline">
                            <NavLink
                              href={route("dashboard")}
                              active={route("").current("dashboard")}
                              className="fs-6 text-white ms-1 text-decoration-none  d-none d-sm-inline"
                            >
                              Dashboard
                            </NavLink>
                          </span>
                        </a>
                      </li>

                      <li className="nav-item text-white my-1 py-2 py-sm-0 hover:bg-blue-700">
                        <a
                          className="nav-link nav-link-hover text-white text-center text-sm-start"
                          aria-current="page"
                        >
                          <span className="ms-2 d-none d-sm-inline">
                            <FontAwesomeIcon icon={faGraduationCap} />
                            <NavLink
                              href={route("student.index")}
                              active={route("").current("student.index")}
                              className="fs-6 text-white ms-2 text-decoration-none d-none d-sm-inline"
                            >
                              Student
                            </NavLink>
                          </span>
                        </a>
                      </li>

                      <li className="nav-item text-white my-1 py-2 py-sm-0 hover:bg-blue-700">
                        <a
                          className="nav-link  nav-link-hover text-white text-center text-sm-start"
                          aria-current="page"
                          onClick={() => setShowSubNav(!showSubNav)}
                        >
                          <FontAwesomeIcon
                            icon={faUserCircle}
                            className="ms-2"
                          />
                          <span className="fs-6 text-white ms-3 d-none d-sm-inline nab-link">
                            Accounts
                          </span>
                          <i className="bi bi-arrow-down-short ms-sm-0"></i>
                        </a>
                      </li>
                      {showSubNav && (
                        <>
                          <li className="nav-item text-white my-1 py-2 py-sm-0 ms-3 hover:bg-blue-700">
                            <NavLink
                              href={route("studentaccount.index")}
                              active={route("").current("studentaccount.index")}
                              className="fs-6 text-white nav-link nav-link-hover-sub ms-3 d-none d-sm-inline flex items-center space-x-2"
                            >
                              <FontAwesomeIcon
                                icon={faUserGraduate}
                                className="text-white inline-block"
                              />
                              <span>Student</span>
                            </NavLink>
                          </li>

                       
                        </>
                      )}

                      <li className="nav-item  my-1 mb-0 py-2  py-sm-0 hover:bg-blue-700">
                        <a
                          className="nav-link nav-link-hover text-white text-center text-sm-start"
                          aria-current="page"
                          onClick={() =>
                            setShowSubjectSubNav(!showSubjectSubNav)
                          }
                        >
                          <FontAwesomeIcon icon={faBook} className="ms-2" />
                          <span className="fs-6 text-white ms-3 d-none d-sm-inline nab-link">
                            Subject
                          </span>
                          <i className="bi bi-arrow-down-short ms-sm-0"></i>
                        </a>
                      </li>
                      {showSubjectSubNav && (
                        <>
                          <li className="nav-item text-white my-1 py-2 py-sm-0 ms-3 hover:bg-blue-700">
                            <NavLink
                              href={route("semestersubject.index")}
                              active={route("").current("semestersubject.index")}
                              className="fs-6 text-white nav-link nav-link-hover-sub ms-3 d-none d-sm-inline flex items-center space-x-2"
                            >
                              <FontAwesomeIcon
                                icon={faBook}
                                className="text-white inline-block"
                              />
                              <span>Assign Subjects</span>
                            </NavLink>
                          </li>

                          <li className="nav-item text-white my-1 py-2 py-sm-0 ms-3 hover:bg-blue-700">
                            <NavLink
                              href={route("assginsubject.index")}
                              active={route("").current("assginsubject.index")}
                              className="fs-6 text-white nav-link nav-link-hover-sub ms-3 d-none d-sm-inline flex items-center space-x-2"
                            >
                              <FontAwesomeIcon
                                icon={faChalkboardTeacher}
                                className="text-white inline-block"
                              />
                              <span>Teacher Subjects</span>
                            </NavLink>
                          </li>
                        </>
                      )}

                 <li className="nav-item  my-1 mb-0 py-2  py-sm-0 hover:bg-blue-700">
                        <a
                          className="nav-link nav-link-hover text-white text-center text-sm-start"
                          aria-current="page"
                          onClick={() =>
                            setShowMarksSubNav(!showMarksSubNav)
                          }
                        >
                          <FontAwesomeIcon icon={faBook} className="ms-2" />
                          <span className="fs-6 text-white ms-3 d-none d-sm-inline nab-link">
                            Student Marks
                          </span>
                          <i className="bi bi-arrow-down-short ms-sm-0"></i>
                        </a>
                      </li>

                      {showMarksSubNav && (
                        <>
                          <li className="nav-item text-white my-1 py-2 py-sm-0 ms-3 hover:bg-blue-700">
                            <NavLink
                              href={route("showstudents")}
                              active={route("").current("showstudents")}
                              className="fs-6 text-white nav-link nav-link-hover-sub ms-3 d-none d-sm-inline flex items-center space-x-2"
                            >
                              <FontAwesomeIcon
                                icon={faBook}
                                className="text-white inline-block"
                              />
                              <span>Student Marks</span>
                            </NavLink>
                          </li>

                          <li className="nav-item text-white my-1 py-2 py-sm-0 ms-3 hover:bg-blue-700">
                            <NavLink
                              href={route("dropstudents.index")}
                              active={route("").current("dropstudents.index")}
                              className="fs-6 text-white nav-link nav-link-hover-sub ms-3 d-none d-sm-inline flex items-center space-x-2"
                            >
                              <FontAwesomeIcon
                                icon={faChalkboardTeacher}
                                className="text-white inline-block"
                              />
                              <span>Drop Student</span>
                            </NavLink>
                          </li>
                          <li className="nav-item text-white my-1 py-2 py-sm-0 ms-3 hover:bg-blue-700">
                            <NavLink
                              href={route("graguatedstudents.index")}
                              active={route("").current("graguatedstudents.index")}
                              className="fs-6 text-white nav-link nav-link-hover-sub ms-3 d-none d-sm-inline flex items-center space-x-2"
                            >
                              <FontAwesomeIcon
                                icon={faChalkboardTeacher}
                                className="text-white inline-block"
                              />
                              <span>Graduated Student</span>
                            </NavLink>
                          </li>
                        </>
                      )}


                  <li className="nav-item text-white my-1 py-2 py-sm-0 hover:bg-blue-700">
                        <a
                          className="nav-link nav-link-hover text-white text-center text-sm-start"
                          aria-current="page"
                        >
                          <span className="ms-2 d-none d-sm-inline">
                            <FontAwesomeIcon icon={faGraduationCap} />
                            <NavLink
                              href={route("student.attendence")}
                              active={route("").current("student.attendence")}
                              className="fs-6 text-white ms-2 text-decoration-none d-none d-sm-inline"
                            >
                              Student Attendence
                            </NavLink>
                          </span>
                        </a>
                      </li>



                    </ul>
                  ) : usertype == 0 ? (
                    <ul
                      className="nav nav-pills flex-column  mt-2 mt-sm-0"
                      id="parentM"
                    >


                <li className="nav-item text-white my-1 py-2 py-sm-0 hover:bg-blue-700">
                        <a
                          className="nav-link nav-link-hover text-white text-center text-sm-start"
                          aria-current="page"
                        >
                          <span className="ms-2 d-none d-sm-inline">
                            <FontAwesomeIcon icon={faGraduationCap} />
                            <NavLink
                              href={route("myprofile")}
                              active={route("").current("myprofile")}
                              className="fs-6 text-white ms-2 text-decoration-none d-none d-sm-inline"
                            >
                              My Info
                            </NavLink>
                          </span>
                        </a>
                      </li>
                      <li className="nav-item text-white my-1 py-2 py-sm-0 hover:bg-blue-700">
                        <a
                          className="nav-link nav-link-hover text-white text-center text-sm-start"
                          aria-current="page"
                        >
                          <span className="ms-2 d-none d-sm-inline">
                            <FontAwesomeIcon icon={faBook} />
                            <NavLink
                              href={route("student.marks")}
                              active={route("").current("student.marks")}
                              className="fs-6 text-white ms-2 text-decoration-none d-none d-sm-inline"
                            >
                              Marks
                            </NavLink>
                          </span>
                        </a>
                      </li>


                    </ul>
                  ) : usertype == 2 ? (
                    <ul
                      className="nav nav-pills flex-column  mt-2 mt-sm-0"
                      id="parentM"
                    >
                  {/*    <li className="nav-item text-white my-1 py-2 py-sm-0 hover:bg-blue-700">
                        <a
                          className="nav-link text-white text-center text-sm-start"
                          aria-current="page"
                        >
                          <i className="bi bi-speedometer2"></i>
                          <NavLink
                            href={route("dashboard")}
                            active={route("").current("dashboard")}
                            className="fs-6 text-white text-decoration-none  ms-3 d-none d-sm-inline"
                          >
                            Dashboard
                          </NavLink>
                        </a>
                      </li>
                  */}

                      <li className="nav-item text-white my-1 py-2 py-sm-0 hover:bg-blue-700">
                        <a
                          className="nav-link nav-link-hover text-white text-center text-sm-start"
                          aria-current="page"
                        >
                          <span className="ms-1 d-none d-sm-inline">
                            <FontAwesomeIcon icon={faBook} />
                            <NavLink
                              href={route("mysubjects")}
                              active={route("").current("mysubjects")}
                              className="fs-6 text-white text-decoration-none ms-2 d-none d-sm-inline"
                            >
                              My Subjects
                            </NavLink>
                          </span>
                        </a>
                      </li>



                    </ul>
                  ) : usertype == 3 ? (
                    <ul
                      className="nav nav-pills flex-column  mt-2 mt-sm-0"
                      id="parentM"
                    >
                      <li className="nav-item text-white my-1  py-2 py-sm-0 hover:bg-blue-700">
                        <a
                          className="nav-link text-white nav-link-hover text-center text-sm-start"
                          aria-current="page"
                        >
                          <i className="bi bi-speedometer2 ms-2"></i>
                          <span className="ms-2 d-none d-sm-inline">
                          <NavLink
                            href={route("dashboard")}
                            active={route("").current("dashboard")}
                            className="fs-6 text-white text-decoration-none  ms-1 d-none d-sm-inline"
                          >
                            Dashboard
                          </NavLink>
                          </span>
                        </a>
                      </li>

                      <li className="nav-item text-white my-1  py-2 py-sm-0 hover:bg-blue-700">
                        <a
                          className="nav-link text-white nav-link-hover text-center text-sm-start"
                          aria-current="page"
                        >
                          <i className="bi bi-speedometer2 ms-2"></i>
                          <span className="ms-2 d-none d-sm-inline">
                          <NavLink
                            href={route("faculty.index")}
                            active={route("").current("faculty.index")}
                            className="fs-6 text-white text-decoration-none  ms-1 d-none d-sm-inline"
                          >
                            Faculty
                          </NavLink>
                          </span>
                        </a>
                      </li>

                      <li className="nav-item text-white my-1  py-2 py-sm-0 hover:bg-blue-700">
                        <a
                          className="nav-link text-white nav-link-hover text-center text-sm-start"
                          aria-current="page"
                        >
                           <FontAwesomeIcon icon={faUser} className="ms-2" />
                          <span className="ms-2 d-none d-sm-inline">
                          <NavLink
                            href={route("manager.index")}
                            active={route("").current("manager.index")}
                            className="fs-6 text-white text-decoration-none  ms-1 d-none d-sm-inline"
                          >
                            Faculty Manager
                          </NavLink>
                          </span>
                        </a>
                      </li>

                      <li className="nav-item  my-1 mb-0 py-2  py-sm-0 hover:bg-blue-700">
                        <a
                          className="nav-link nav-link-hover text-white text-center text-sm-start"
                          aria-current="page"
                          onClick={() =>
                            setShowSemesterSubNav(!showSemesterSubNav)
                          }
                        >
                          <FontAwesomeIcon icon={faBook} className="ms-2" />
                          <span className="fs-6 text-white ms-3 d-none d-sm-inline nab-link">
                            Semester
                          </span>
                          <i className="bi bi-arrow-down-short ms-sm-0"></i>
                        </a>
                      </li>
                      {showSemesterSubNav && (
                        <>
                          <li className="nav-item text-white my-1 py-2 py-sm-0 ms-3 hover:bg-blue-700">
                            <NavLink
                              href={route("semester.index")}
                              active={route("").current("semester.index")}
                              className="fs-6 text-white nav-link nav-link-hover-sub   ms-3 d-none d-sm-inline"
                            >
                              <span className="me-2">*</span>
                              Semester
                            </NavLink>
                          </li>

                          <li className="nav-item text-white my-1 py-2 py-sm-0 ms-3 hover:bg-blue-700">
                            <NavLink
                              href={route("assignsemester.index")}
                              active={route("").current("assignsemester.index")}
                              className="fs-6 text-white nav-link nav-link-hover-sub  ms-3 d-none d-sm-inline"
                            >
                              <span className="me-2">*</span>
                              Assign Semesters
                            </NavLink>
                          </li>
                        </>
                      )}

                      <li className="nav-item  my-1 py-2 py-sm-0 hover:bg-blue-700">
                        <a
                          className="nav-link text-white text-center text-sm-start"
                          aria-current="page"
                          onClick={() =>
                            setShowTeacherSubNav(!showTeacherSubNav)
                          }
                        >
                          <FontAwesomeIcon icon={fas.faChalkboardTeacher} />
                          <span className="ms-1 d-none d-sm-inline">
                            <span className="fs-6 text-white ms-3 d-none d-sm-inline nab-link">
                              Teachers
                            </span>
                            <i className="bi bi-arrow-down-short ms-sm-0"></i>
                          </span>
                        </a>
                      </li>

                      {showTeacherSubNav && (
                        <>
                          <li className="nav-item text-white my-1 py-2 py-sm-0 ms-3 hover:bg-blue-700">
                            <NavLink
                              href={route("teacher.index")}
                              active={route("").current("studentaccount.index")}
                              className="fs-6 text-white nav-link nav-link-hover-sub   ms-3 d-none d-sm-inline"
                            >
                              <span className="me-2">*</span>
                              Teacher List
                            </NavLink>
                          </li>

                          <li className="nav-item text-white my-1 py-2 py-sm-0 ms-3 hover:bg-blue-700">
                            <NavLink
                              href={route("teacheraccount.index")}
                              active={route("").current(
                                "employeeaccount.index"
                              )}
                              className="fs-6 text-white nav-link nav-link-hover-sub  ms-3 d-none d-sm-inline"
                            >
                              <span className="me-2">*</span>
                              Teacher Account
                            </NavLink>
                          </li>


                        </>


                      )}
               <li className="nav-item text-white my-1  py-2 py-sm-0 hover:bg-blue-700">
                        <a
                          className="nav-link text-white nav-link-hover text-center text-sm-start"
                          aria-current="page"
                        >
                           <FontAwesomeIcon icon={faBook} className="ms-2" />
                          <span className="ms-2 d-none d-sm-inline">
                          <NavLink
                            href={route("subject.index")}
                            active={route("").current("subject.index")}
                            className="fs-6 text-white text-decoration-none  ms-1 d-none d-sm-inline"
                          >
                            Subject
                          </NavLink>
                          </span>
                        </a>
                      </li>
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>
          </aside>

          <main className="mt-5   ml-auto col-10">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
