import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import ErrorModal from "@/Pages/ErrorModal";
import SuccessModal from "@/Pages/SuccessModal";
import DangerButton from "@/Components/DangerButton";
import SelectInput from "@/Components/SelectInput";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

 export default function Index({auth,facultys,Departments,semesters,error,success}){

  const [successMessage, setSuccessMessage] = useState(success || null);
  const [errorMessage, setErrorMessage] = useState(error || null);

  const [selectedDepartmentid,setselectedDepartmentid] = useState('');
  const [Semesters,setSemesters] = useState([]);
  const [selectedFacultyid,setSelectedFacultyid] = useState('');
  const [departments,setDepartments] = useState([]);


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

    if(selectedFacultyid){
     let filteredDept = Departments.filter(dept => {
        return dept.faculty_id == selectedFacultyid
      })
      setDepartments(filteredDept);

    }

  },[selectedFacultyid]);



   useEffect(() => {

    console.log(selectedDepartmentid,"hi");
     if(selectedDepartmentid){

      let filteredsemesters = semesters.data.filter(sem => {
      return sem.department_id == selectedDepartmentid;

     })

     setSemesters(filteredsemesters);

    }

  },[selectedDepartmentid])


  const deletesemester = (Semester) => {
    console.log(Semester);
    if (!window.confirm("Are you sure to delete this semester?")) {
      return;
    }

    router.delete(route("assignsemester.destroy",Semester.id));
  };



return(

  <AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Assgined Semesters</h2>}

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
                <h6 className="text-gray-500 mb-1">Faculty</h6>
                  <SelectInput
                   className="form-control"
                   value={selectedFacultyid}
                   isFocused={true}
                   onChange={(e) => setSelectedFacultyid(e.target.value)}
                 >
                 <option>Select Faculty</option>
                  {facultys.map((faculty) => (

                    <option value={faculty.id} key={faculty.id}>{faculty.faculty_name}</option>

                  ))

                  }
                 </SelectInput>

              </div>
            </div>
            <div className='col-md-4'>
            <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl d-flex flex-column">
                <h6 className="text-gray-500 mb-1">Department</h6>
                       <SelectInput
                              id="department"
                              className="form-control mt-1"
                              name="department_id"
                              value={selectedDepartmentid}
                              onChange={(e) => setselectedDepartmentid(e.target.value)}
                           >
                            <option vlaue="">Select department</option>

                             {departments.length > 0 ? (

                                  departments.map((department) => (
                                  <option value={department.id} key={department.id}>{department.name}</option>

                                ))

                              ) : (

                                <option value="">Select a faculty fisrt</option>
                               )}

                           </SelectInput>
              </div>
            </div>


             <div className='col-md-4 text-end'>
              <div className='me-3 mt-4'>
              <Link
                 href={route('assignsemester.create')}
                 className="bg-emerald-500 py-1  px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                >
              Assign Semester
            </Link>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>

           {Semesters.length > 0 ? (
            <div className='overflow-auto'>
                <table className='w-full text-md text-left rtl:text-right
                     dark:bg-gray-700 dark:text-gray-300 '>
                   <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400
                        border-b-2 border-gray-500'>
                      <tr className='text-nowrap bg-gray-500 text-white align-middle'>
                        <th className='px-3 py-2'>ID</th>
                        <th className='px-3 py-2'>Name</th>
                        <th className='px-3 py-2'>Action</th>

                      </tr>
                   </thead>
                    <tbody>
                      {Semesters.map((Semester) => (

                          <tr className='bg-gray border-b dark:bg-gray-800  dark:border-gray-700 hover:bg-gray-200 align-middle' key={Semester.id}>
                           <td className='px-3 py-2'>{Semester.semester.id}</td>
                           <td className='px-3 py-2'>{Semester.semester.name}</td>
                           <td className='px-3 py-2 text-nowrap'>
                            <DangerButton
                             onClick={(e) => deletesemester(Semester)}
                             className='mx-3'
                             >
                              <FontAwesomeIcon icon={faTrash} className="ms-2" />
                            </DangerButton>
                           </td>
                         </tr>

                      ))}
                    </tbody>
                </table>

           </div>

                ):(
                    <h6 className="text-gray-300 text-center">No semesters yet</h6>
                )}

       </div>
       </div>
       </div>
  </AuthenticatedLayout>
);

}
