import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DangerButton from "@/Components/DangerButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, router,usePage } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import { useEffect, useState } from "react";
import SuccessModal from "@/Pages/SuccessModal";
import ErrorModal from "@/Pages/ErrorModal";

import SuccessModal from "@/Pages/SuccessModal";
import ErrorModal from "@/Pages/ErrorModal";
import { useEffect,useState } from "react";

export default function Index({ auth,success,error,students,departments,queryparams = null }) {

          // for the modal of success and error
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
  //

  queryparams = queryparams || {}

  const searchfeildchanged = (name,value)  =>{

      if(value){
       queryparams[name] = value;

      } else{
        delete queryparams[name]
      }

      router.get(route('student.index'),queryparams);
    }

  const onKeyPress = (name,e) => {
     if(e.key !== "Enter") return;

     searchfeildchanged(name,e.target.value);


    }

    const searchDepartmentfeildchanged = (name,value)  =>{

      if(value){
       queryparams[name] = value;

      } else{
        delete queryparams[name]
      }

      router.get(route('student.index'),queryparams);
    }

  const deleteStudent = (student) =>{

    if(!window.confirm("Are you sure to delete this student from system?")){
     return;
     }

    router.delete(route("student.destroy",student.id));

    }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Student list
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
            <div className='col-md-2'>
              <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl d-flex flex-column">
                <h6 className="text-gray-500 mb-1">Kankor ID</h6>
                  <TextInput
                   className="form-control"
                   placeholder="Search..."
                   defaultValue={queryparams.kankor_id}
                   onBlur={e => searchfeildchanged('kankor_id',e.target.value)}
                   onKeyPress={e => onKeyPress('kankor_id',e)}

                 />

              </div>
            </div>
            <div className='col-md-2'>
              <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl d-flex flex-column">
                <h6 className="text-gray-500 mb-1">Name</h6>
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
                <h6 className="text-gray-500 mb-1">Department</h6>
                <SelectInput
                   className="form-control"
                   placeholder="Search..."
                  defaultValue={queryparams.department}
                   onChange={(e) => searchDepartmentfeildchanged('department',e.target.value)}
                 >
                    <option>Select</option>
                     {departments.map((department) => (

                       <option value={department.name} key={department.id}>{department.name}</option>

                     ))
                    }

                 </SelectInput>

              </div>
            </div>

            <div className="col-md-2 ">
            <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl d-flex flex-column">
                <h6 className="text-gray-500 mb-1">semester</h6>
                  <TextInput
                   className="form-control"
                   type="number"
                   placeholder="Search..."
                   defaultValue={queryparams.semester}
                   onBlur={e => searchfeildchanged('semester',e.target.value)}
                   onKeyPress={e => onKeyPress('semester',e)}
                 />

              </div>
            </div>



             <div className='col-md-4 text-end'>
              <div className='me-3 mt-4'>
              <Link
                 href={route('student.create')}
                 className="bg-emerald-500 py-1  px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                >
               Add New Student
            </Link>
            </div>
            <div className="mt-3 me-4">
             <Link
                className="btn btn-outline-secondary py-1 px-3  rounded shadow transition-all hover:bg-gray-600"
                href={route("student.index")}
               >
                Reset page
               </Link>
              </div>
            </div>

            </div>
            </div>
            </div>
            </div>
            <div className="row mb-2 ms-4">
              <div className="col-md-3">
                <span className="text-gray-400">Make Attendence for first semesters</span>
               <SelectInput
                   className="form-control"
                   placeholder="Search..."
                   defaultValue={queryparams.department}
                   onChange={(e) => searchDepartmentfeildchanged('department',e.target.value)}
                 >
                    <option>Select Department</option>
                     {departments.map((department) => (

                       <option value={department.name} key={department.id}>{department.name}</option>

                     ))
                    }

                 </SelectInput>

              </div>
            </div>
            <div className='overflow-auto'>
                <table className='w-full text-md text-left rtl:text-right
                     dark:bg-gray-700 dark:text-gray-300 '>
                   <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400
                        border-b-2 border-gray-500'>
                      <tr className='text-nowrap bg-gray-500 text-white align-middle'>
                       <th className='px-3 py-2 '>ID</th>
                        <th className='px-3 py-2 '>Name</th>
                        <th className='px-3 py-2'>Father Name</th>
                        <th className='px-3 py-2'>Department</th>
                        <th className='px-3 py-2'>Current Semester</th>
                        <th className='px-3 py-2'>Phone Number</th>
                        <th className='px-3 py-2'>Kankor ID</th>
                        <th className='px-3 py-2'>Action</th>
                      </tr>
                   </thead>
                    <tbody>
                      {students.data.map((student) => (

                          <tr className='bg-gray border-b dark:bg-gray-800  dark:border-gray-700 hover:bg-gray-200 align-middle' key={student.id}>
                           <td className='px-3 py-2'>{student.id}</td>
                           <td className='px-3 py-2'>{student.name}</td>
                           <td className='px-3 py-2 text-center'>{student.father_name}</td>
                           <td className='px-3 py-2 text-center'>{student.department.name}</td>
                           <td className='px-3 py-2 text-center'>{student.current_semester}</td>
                           <td className='px-3 py-2'>{student.phone_number}</td>
                           <td className='px-3 py-2 text-center'>{student.kankor_id}</td>
                           <td className='px-3 py-2 text-nowrap'>

                           <Link
                              href={route("student.show",student.id)}
                              className='font-meduim text-gray-600 dark:text-blue-500 hover:bg-gray-300 mx-2 '

                            >
                             Complete Info
                            </Link>

                            <Link
                              href={route("student.edit",student.id)}
                              className='font-meduim text-blue-600 dark:text-blue-500 hover:bg-gray-300 mx-1 btn btn-outline-primary'

                            >
                             Edit
                            </Link>

                            <DangerButton
                             onClick={(e) => deleteStudent(student)}
                             className='mx-3'
                             >
                              Delete
                            </DangerButton>
                           </td>
                         </tr>
                      ))}
                    </tbody>
                </table>

                <Pagination links={students.meta.links}></Pagination>
           </div>
          </div>
          </div>
        </div>
    </AuthenticatedLayout>
  );
}
