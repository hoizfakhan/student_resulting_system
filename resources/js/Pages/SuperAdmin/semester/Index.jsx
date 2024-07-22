import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import ErrorModal from "@/Pages/ErrorModal";
import SuccessModal from "@/Pages/SuccessModal";
import DangerButton from "@/Components/DangerButton";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Index({auth,semesters,error,success}){

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

  const deletesemester = (semester) => {
    if (!window.confirm("Are you sure to delete this semester?")) {
      return;
    }

    router.delete(route("semester.destroy",semester.id));
  };

return(

  <AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Semesters List</h2>}

  >
  <Head title="Semesters List" />
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
                  Semester List
                </div>
              </div>

              <div className="col-md-6 text-end ">
                <div className="me-3 mt-4">
                  <Link
                    href={route("semester.create")}
                    className="bg-emerald-500 py-1  px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                  >
                    Add New Semester
                  </Link>
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
                    <th className="px-3 py-2 ">ID</th>
                    <th className="px-3 py-2 ">Name</th>
                    <th className="px-3 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {semesters.map((semester) => (
                    <tr
                      className="bg-gray border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200"
                      key={semester.id}
                    >
                      <td className="px-3 py-2">{semester.id}</td>
                      <td className="px-3 py-2">{semester.name}</td>

                      <td className="px-3 py-2 text-nowrap">
                        <Link
                          href={route("semester.edit", semester.id)}
                          className="font-meduim text-blue-600 dark:text-blue-500 hover:bg-gray-300 mx-1 btn btn-outline-primary"
                        >
                          <FontAwesomeIcon icon={faEdit} className="ms-2" />
                        </Link>

                        <DangerButton
                        onClick={(e) => deletesemester(semester)}
                          className="mx-3"
                        >
                          <FontAwesomeIcon icon={faTrash} className="ms-2" />
                        </DangerButton>

                      </td>
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
