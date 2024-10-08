import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import ErrorModal from "@/Pages/ErrorModal";
import SuccessModal from "@/Pages/SuccessModal";
import DangerButton from "@/Components/DangerButton";
import SelectInput from "@/Components/SelectInput";

 export default function Index({auth,students,departments,semesters,error,success}){

  const [successMessage, setSuccessMessage] = useState(success || null);
  const [errorMessage, setErrorMessage] = useState(error || null);

  const [Semesters,setSemesters] = useState([]);
  const [Students,setStudents] = useState([]);
  const [selectedDepartmentid,setSelectedDepartmentid] = useState('');
  const [selectedSemesterid,setSelectedSemesterid] = useState('');



  useEffect(() => {


    if(selectedDepartmentid){
     let filteredSem = semesters.data.filter(sem => {
        return sem.department_id == selectedDepartmentid
      })
      setSemesters(filteredSem);

    }

  },[selectedDepartmentid]);


  useEffect(() => {

    if(selectedDepartmentid,selectedSemesterid){

     let filteredst= students.data.filter(st => {
     return st.department_id == selectedDepartmentid

    })

    setStudents(filteredst);

   }

 },[selectedDepartmentid,selectedSemesterid])


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


     const exportUrl = route('students.export', {
      department_id: selectedDepartmentid,
      semester_id: selectedSemesterid
    });










   return(

     <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Student Attendence</h2>}

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

                                <option value="">Select a Department fisrt</option>
                               )}

                   </SelectInput>
              </div>
            </div>


             <div className='col-md-4 text-end'>
              <div className='me-3 mt-4'>
              <a
                 href={exportUrl}
                 className="bg-emerald-500 py-1 text-decoration-none  px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                >
              Export To Excel
            </a>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>

           {Students.length > 0 ? (
            <div className='overflow-auto'>
                <table className='w-full text-md text-left rtl:text-right
                     dark:bg-gray-700 dark:text-gray-300 '>
                   <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400
                        border-b-2 border-gray-500'>
                      <tr className='text-nowrap bg-gray-500 text-white align-middle'>
                        <th className='px-3 py-2'>Name</th>
                        <th className='px-3 py-2'>Father Name</th>


                      </tr>
                   </thead>
                    <tbody>
                      {Students.map((student) => (

                          <tr className='bg-gray border-b dark:bg-gray-800  dark:border-gray-700 hover:bg-gray-200 align-middle' key={student.id}>
                           <td className='px-3 py-2'>{student.name}</td>
                           <td className='px-3 py-2'>{student.father_name}</td>


                         </tr>

                      ))}
                    </tbody>
                </table>

           </div>

                ):(
                    <h6 className="text-gray-300 text-center">No students yet</h6>
                )}



       </div>
       </div>

       </div>

  </AuthenticatedLayout>
);

}
