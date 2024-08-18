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

  const [Semesters,setSemesters] = useState([]);
  const [Students,setStudents] = useState([]);
  const [selectedDepartmentid,setSelectedDepartmentid] = useState('');
  const [selectedSemesterid,setSelectedSemesterid] = useState('');

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


    if(selectedDepartmentid){
     let filteredSem = semesters.data.filter(sem => {
        return sem.department_id == selectedDepartmentid
      })
      setSemesters(filteredSem);

    }

     },[selectedDepartmentid]);


  useEffect(() => {

    console.log(selectedSemesterid);
    if(selectedDepartmentid,selectedSemesterid){

     let filteredst= students.data.filter(st => {
     return st.department_id == selectedDepartmentid

    })

    setStudents(filteredst);

   }

 },[selectedDepartmentid,selectedSemesterid])

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

          <div className="container mb-4">
          <div className='row'>
           <div className="col-md-12">
            <div className="row">
            <div className='col-md-4'>
              <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl d-flex flex-column">
                <h6 className="text-gray-500 mb-1">Department</h6>
                  <SelectInput
                   className="form-control"
                   value={selectedDepartmentid}
                   isFocused={true}
                   onChange={(e) => setSelectedDepartmentid(e.target.value)}
                 >
                 <option>Select Department</option>
                 {departments.map((department) => (

                    <option value={department.id} key={department.id}>{department.name}</option>

                 ))
                 }
                 </SelectInput>
              </div>
            </div>

            <div className='col-md-4'>
            <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl d-flex flex-column">
                <h6 className="text-gray-500 mb-1">Semester</h6>
                       <SelectInput
                              id="department"
                              className="form-control mt-1"
                              name="semester_id"
                              value={selectedSemesterid}
                              onChange={(e) => setSelectedSemesterid(e.target.value)}
                           >

                            <option vlaue="">Select Semester</option>

                             {Semesters.length > 0 ? (

                                  Semesters.map((semester) => (
                                  <option value={semester.semester.id} key={semester.id}>{semester.semester.name}</option>

                                ))

                              ) : (

                                <option value="">Select a Department first</option>
                               )}

                   </SelectInput>
              </div>
            </div>
            </div>
            </div>
            </div>
            </div>



      {Students.length > 0 ? (
         <div className="overflow-x-auto">
         <div className="container mb-2">
          <div className='row'>
           <div className="col-md-12">
            <div className="row">

           {/* <div className='col-md-2'>
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
           */}

           {/* <div className='col-md-2'>
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
           */}

           {/* <div className='col-md-2 mt-2'>
              <div className='me-3 mt-4'>
              <Link
                  href={route("student.index")}
                  className="bg-gray-400 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-sm shadow-lg transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faRedo} className="ms-2" />
                </Link>
            </div>
            </div>
           */}

            </div>
            </div>
            </div>
            </div>
                  <table className="w-full text-md text-left rtl:text-right dark:bg-gray-700 dark:text-gray-300">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                      <tr className="bg-gray-500 text-white">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">F/Name</th>
                        <th className="px-4 py-2">Show Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Students.map((student, index) => (
                        <tr
                          key={student.id}
                          className={`${
                            index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
                          } dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600`}
                        >
                          <td className="px-4 py-2">{student.name}</td>
                          <td className="px-4 py-2">{student.father_name}</td>
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
    </AuthenticatedLayout>
  );
}
