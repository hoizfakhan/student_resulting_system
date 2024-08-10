import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, Link, router } from "@inertiajs/react";
import DangerButton from "@/Components/DangerButton";
import Pagination from "@/Components/Pagination";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import ErrorModal from "@/Pages/ErrorModal";
import SuccessModal from "@/Pages/SuccessModal";
import { useEffect, useState } from "react";
import { faEdit, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Index({ auth,dropStudents, success, error }) {


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



  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Drop Student
        </h2>
      }
    >
      <Head title="drop_student" />

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
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="row">
              <div className="col-md-6">
                <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl">
                  Drop Students List
                </div>
              </div>

              
            </div>

            <div className="overflow-auto">
              <table
                className="w-full text-md text-left rtl:text-right
                     dark:bg-gray-700 dark:text-gray-300 "
              >
                <thead
                  className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400
                        border-b-2 border-gray-500"
                >
                  <tr className="text-nowrap bg-gray-500 text-white">
                    <th className="px-3 py-2 ">Name</th>
                    <th className="px-3 py-2">Department</th>
                    <th className="px-3 py-2">Drop Semester</th>
                    <th className="px-3 py-2">Drop Year</th>

                  </tr>
                </thead>

                <tbody>
                {dropStudents.data.map(dropStudent => (
                        <tr
                        className="bg-gray border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200"
                        key={dropStudent.id}>
                            <td className="px-3 py-2">{dropStudent.student ? dropStudent.student.name : 'N/A'}</td>
                            <td className="px-3 py-2">{dropStudent.student && dropStudent.student.department ? dropStudent.student.department.name : 'N/A'}</td>
                            <td className="px-3 py-2">{dropStudent.semester ? dropStudent.semester.name : 'N/A'}</td>
                            <td className="px-3 py-2">{dropStudent.droped_year}</td>

                        </tr>
                    ))}
                </tbody>

              </table>

            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
