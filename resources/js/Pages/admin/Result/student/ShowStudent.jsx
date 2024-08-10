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
import SelectInput from "@/Components/SelectInput";
import InputError from "@/Components/InputError";
import { faEdit, faPlusCircle, faRedo, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle,faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ShowStudent({ auth, departments, semesters, students, success, error }) {
  const [successMessage, setSuccessMessage] = useState(success || null);
  const [errorMessage, setErrorMessage] = useState(error || null);

  const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
  const [selectedSemesterId, setSelectedSemesterId] = useState('');
  const [filteredSemesters, setFilteredSemesters] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

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

  useEffect(() => {
    if (selectedDepartmentId) {
      setFilteredSemesters(
        semesters.data.filter(sem => sem.department_id == selectedDepartmentId)
      );
    }
  }, [selectedDepartmentId]);

  useEffect(() => {
    if (selectedDepartmentId) {
      setFilteredStudents(
        students.data.filter(st => st.department_id == selectedDepartmentId)
      );
    }
  }, [selectedDepartmentId]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Students Marks
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
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
              <div className="mb-4 flex flex-col md:flex-row items-start gap-4">
                <div className="flex-1">
                  <InputLabel forInput="department_id" value="Department" />
                  <SelectInput
                    id="department_id"
                    value={selectedDepartmentId}
                    onChange={(e) => setSelectedDepartmentId(e.target.value)}
                    className="mt-1 form-control block w-full"
                  >
                    <option value="">Select Department</option>
                    {departments.map((department) => (
                      <option value={department.id} key={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </SelectInput>
                </div>
                <div className="flex-1">
                  {/* Future filter by semester */}
                </div>
              </div>

              {filteredStudents.length > 0 ? (



      <div className="overflow-x-auto">
         <div className="container mb-2">
          <div className='row'>
           <div className="col-md-12">
            <div className="row">
            <div className='col-md-2'>
              <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl d-flex flex-column">

                  <TextInput
                   className="form-control"
                   placeholder="name"
                 //  defaultValue={queryparams.name}
                   //onBlur={e => searchfeildchanged('name',e.target.value)}
                   //onKeyPress={e => onKeyPress('name',e)}

                 />

              </div>
            </div>
            <div className='col-md-2'>
              <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl d-flex flex-column">

                <TextInput
                   className="form-control"
                   placeholder="father name"
                   type="text"
                 //  defaultValue={queryparams.father_name}
                   //onBlur={e => searchfeildchanged('father_name',e.target.value)}
                   //onKeyPress={e => onKeyPress('father_name',e)}
                 />

              </div>
            </div>
            <div className='col-md-2 mt-2'>
              <div className='me-3 mt-4'>
              <Link
                  href={route("student.index")}
                  className="bg-gray-400 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-sm shadow-lg transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faRedo} className="ms-2" />
                </Link>
            </div>
            </div>

            </div>
            </div>
            </div>
            </div>
                  <table className="w-full text-md text-left rtl:text-right dark:bg-gray-700 dark:text-gray-300">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                      <tr className="bg-gray-500 text-white">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">F/Name</th>
                        <th className="px-4 py-2">Percentage</th>
                        <th className="px-4 py-2">Semester</th>
                        <th className="px-4 py-2">Show Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student, index) => (
                        <tr
                          key={student.id}
                          className={`${
                            index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
                          } dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600`}
                        >
                          <td className="px-4 py-2">{student.name}</td>
                          <td className="px-4 py-2">{student.father_name}</td>
                          <td className="px-4 py-2"></td>
                          <td className="px-4 py-2">
                            {student.current_semester ? student.current_semester.name : "No Current Semester"}
                          </td>
                          <td className="px-4 py-2 flex space-x-2">
                            <Link
                              href={route("ShowMarks", student.id)}
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
              ) : (
                <h6 className="text-gray-500 text-center">No Students yet</h6>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
