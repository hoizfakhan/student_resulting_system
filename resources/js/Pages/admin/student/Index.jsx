import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DangerButton from "@/Components/DangerButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, router, usePage } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import SuccessModal from "@/Pages/SuccessModal";
import ErrorModal from "@/Pages/ErrorModal";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown,faBook, faEdit, faTrash, faUserPlus, faRedo } from '@fortawesome/free-solid-svg-icons';


export default function Index({
  auth,
  success,
  error,
  students,
  departments,
  queryparams = null,
}) {

  console.log(students);

  const [successMessage, setSuccessMessage] = useState(success || null);
  const [errorMessage, setErrorMessage] = useState(error || null);

  useEffect(() => {
    if (success) {
      setSuccessMessage(success);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  queryparams = queryparams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryparams[name] = value;
    } else {
      delete queryparams[name];
    }
    router.get(route("student.index"), queryparams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };



    const searchDepartmentFieldChanged = (name, value) => {
      if (value) {
        queryparams[name] = value;
      } else {
        delete queryparams[name];
      }

      router.get(route("student.index"), queryparams);
    };

    const sortChanged = (name) => {
      if (name === queryparams.sort_field) {
        if (queryparams.sort_direction === "asc") {
          queryparams.sort_direction = "desc";
        } else {
          queryparams.sort_direction = "asc";
        }
      } else {
        queryparams.sort_field = name;
        queryparams.sort_direction = "asc";
      }

      router.get(route("student.index"), queryparams);
    };

    const deleteStudent = (student) => {
      if (!window.confirm("Are you sure to delete this student from system?")) {
        return;
      }

      router.delete(route("student.destroy", student.id));
    };



  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Student List
        </h2>
      }
    >
      <Head title="Student" />
      <div className="py-12">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
          {successMessage && (
            <SuccessModal
              message={successMessage}
              onClose={() => setSuccessMessage(null)}
            />
          )}

          {errorMessage && (
            <ErrorModal
              message={errorMessage}
              onClose={() => setErrorMessage(null)}
            />
          )}

    <div className="overflow-auto shadow-lg rounded-lg p-6 ">
            {/* Search Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              <div className="flex flex-col">
                <label className="text-gray-500 dark:text-gray-400 mb-2">
                  Kankor ID
                </label>
                <TextInput
                  className="form-control w-full p-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                  placeholder="Search..."
                  defaultValue={queryparams.kankor_id}
                  onBlur={(e) =>
                    searchFieldChanged("kankor_id", e.target.value)
                  }
                  onKeyPress={(e) => onKeyPress("kankor_id", e)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-500 dark:text-gray-400 mb-2">
                  Name
                </label>
                <TextInput
                  className="form-control w-full p-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                  placeholder="Search..."
                  defaultValue={queryparams.name}
                  onBlur={(e) => searchFieldChanged("name", e.target.value)}
                  onKeyPress={(e) => onKeyPress("name", e)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-500 dark:text-gray-400 mb-2">
                  Department
                </label>
                <SelectInput
                  className="form-control w-full p-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                  placeholder="Search..."
                  defaultValue={queryparams.department}
                  onChange={(e) =>
                    searchDepartmentFieldChanged("department", e.target.value)
                  }
                >
                  <option className="dark:bg-gray-700" value="">Select</option>
                  {departments.map((department) => (
                    <option
                      value={department.name}
                      key={department.id}
                      className="dark:bg-gray-700"
                    >
                      {department.name}
                    </option>
                  ))}
                </SelectInput>
              </div>

              {/* Semester Dropdown */}
              <div className="flex flex-col mt-3">

              <div className="mt-4">
                <Link
                  href={route("student.index")}
                  className="bg-gray-400 hover:bg-gray-600 text-gray-700 py-2 px-4 rounded-lg shadow-lg transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faRedo} className="ms-2" />
                </Link>
              </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <Link
                  href={route("student.create")}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg shadow-lg transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faUserPlus} className="ms-2" />
                </Link>
              </div>

            </div>
          {/* </div> */}

          {/* Additional Filter */}


          {/* Student List Table */}
          {/* <div className="overflow-auto shadow-lg rounded-lg"> */}
            <table className="w-full text-md text-left rtl:text-right dark:bg-gray-700 dark:text-gray-300 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400 border-b-2 border-gray-500">
                <tr className="bg-gray-500 text-white">
                  <th className="px-3 py-2">ID</th>
                  <th className="px-3 py-2">
                    <th onClick={(e) => sortChanged("name")}>
                      <div className="px-3 py-2 flex items-center justify-contant gap-1 cursor-pointer">
                        Name
                        <div>
                          <FontAwesomeIcon icon={faChevronUp}
                            className={
                              "w-4  " +
                              (queryparams.sort_field === "name" &&
                              queryparams.sort_direction === "asc"
                                ? "text-white text-white inline-block"
                                : "")
                            }
                          />
                          <FontAwesomeIcon icon={faChevronDown}
                            className={
                              "w-4 -mt-2 text-white inline-block" +
                              (queryparams.sort_field === "name" &&
                              queryparams.sort_direction === "desc"
                                ? "text-white"
                                : "")
                            }
                          />
                        </div>
                      </div>
                    </th>
                  </th>
                  <th className="px-3 py-2">Father Name</th>
                  <th className="px-3 py-2">Department</th>
                  <th className="px-3 py-2">Current Semester</th>
                  <th className="px-3 py-2">Phone Number</th>
                  <th className="px-3 py-2">Kankor ID</th>
                  <th onClick={(e) => sortChanged("kankor_marks")}>
                    <div className="px-3 py-2 flex items-center justify-contant gap-1 cursor-pointer">
                      Kankor Marks
                      <div>
                        <FontAwesomeIcon icon={faChevronUp}  className="w-4 text-white inline-block" />
                        <FontAwesomeIcon icon={faChevronDown} className="w-4 -mt-2 text-white inline-block" />
                      </div>
                    </div>
                  </th>
                  <th className="px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.data.map((student) => (
                  <tr
                    className="bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
                    key={student.id}
                  >
                    <td className="px-3 py-2">{student.id}</td>
                    <td className="px-3 py-2">{student.name}</td>
                    <td className="px-3 py-2 text-center">
                      {student.father_name}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {student.department.name}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {

                      student.current_semester ?  student.current_semester.name : "no current semester"

                      }
                    </td>
                    <td className="px-3 py-2">{student.phone_number}</td>
                    <td className="px-3 py-2 text-center">
                      {student.kankor_id}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {student.kankor_marks}
                    </td>
                    <td className="px-3 py-2 text-nowrap flex space-x-2">
                      <Link
                        href={route("student.show", student.id)}
                        className="font-meduim text-gray-600 dark:text-blue-500 hover:bg-gray-300 mx-2 btn btn-secondary"
                      >
                        <FontAwesomeIcon icon={faBook} className="ms-2" />
                      </Link>

                      <Link
                        href={route("student.edit", student.id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:bg-gray-300 mx-1 btn btn-outline-primary"
                      >
                        <FontAwesomeIcon icon={faEdit} className="ms-2" />
                      </Link>

                      <DangerButton
                        onClick={() => deleteStudent(student)}
                        className="mx-3"
                      >
                        <FontAwesomeIcon icon={faTrash} className="ms-2" />
                      </DangerButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4">
              <Pagination links={students.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );

}
