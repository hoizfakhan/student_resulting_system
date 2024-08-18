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
import { faEdit, faGraduationCap, faRedo, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectInput from "@/Components/SelectInput";

export default function Index({ auth,graduatedStudents, queryparams = null, departments,success, error }) {


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
  const searchfeildchanged = (name, value) => {
    if (value) {
      queryparams[name] = value;
    } else {
      delete queryparams[name];
    }

    router.get(route("graguatedstudents.index"), queryparams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchfeildchanged(name, e.target.value);
  };



  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Graduated Student
        </h2>
      }
    >
      <Head title="graduated_student" />

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

          <div className="container mb-4">
          <div className='row'>
           <div className="col-md-12">
            <div className="row">
            <div className='col-md-2'>
              <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl d-flex flex-column">
                <h6 className="text-gray-500 mb-1">name</h6>
                  <TextInput
                   className="form-control"
                   placeholder="Search..."
                   defaultValue={queryparams.name}
                   onBlur={e => searchfeildchanged('name',e.target.value)}
                   onKeyPress={e => onKeyPress('name',e)}

                 />

              </div>
            </div>
            <div className='col-md-2'>
              <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl d-flex flex-column">
                <h6 className="text-gray-500 mb-1">Father Name</h6>

                <TextInput
                   className="form-control"
                   placeholder="Search..."
                   defaultValue={queryparams.father_name}
                   onBlur={e => searchfeildchanged('father_name',e.target.value)}
                   onKeyPress={e => onKeyPress('father_name',e)}

                 />


              </div>
            </div>


            <div className="col-md-2 mt-5">
               <Link
                 className="btn hover:bg-gray-500 btn-outline-secondary"
                 href={route("graguatedstudents.index")}
               >
                <FontAwesomeIcon icon={faRedo} className="ms-2" />
               </Link>
            </div>

            </div>
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
                    <th className="px-3 py-2"> Graduated Date</th>
                    <th className="px-3 py-2">Education Degree</th>
                    <th className="px-3 py-2">Show Marks</th>

                  </tr>
                </thead>

                <tbody>
                {graduatedStudents.data.map(graduatedStudent => (
                        <tr
                        className="bg-gray border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200"
                        key={graduatedStudent.id}>
                            <td className="px-3 py-2">{graduatedStudent.student ? graduatedStudent.student.name : 'N/A'}</td>
                            <td className="px-3 py-2">{graduatedStudent.student && graduatedStudent.student.department ? graduatedStudent.student.department.name : 'N/A'}</td>
                            <td className="px-3 py-2">{graduatedStudent.graduated_date}</td>
                            <td className="px-3 py-2">{graduatedStudent.education_degree}</td>
                            <td className="px-4 py-2 flex space-x-2">
                            <Link
                              href={route("ShowMarks", graduatedStudent.student.id)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <FontAwesomeIcon icon={faGraduationCap} />
                            </Link>

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
