import DangerButton from "@/Components/DangerButton";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import SuccessModal from "@/Pages/SuccessModal";
import ErrorModal from "@/Pages/ErrorModal";
import { useEffect, useState } from "react";


export default function Index({auth,teacherSubjects,teachers,queryparams = null,success,error}){

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
  queryparams = queryparams || {};

   const searchfeildchanged = (name,value) => {

  if(value){

     queryparams[name] = value;

   }else{
    delete queryparams[subject];
   }

  router.get(route("assginsubject.index",queryparams));

   }

  const onKeyPress = (name,e) => {
  if(e.key !== 'Enter') return

  searchfeildchanged(name,e.target.value);


   }


   const deleteSubject = (teacherSubject) => {
    console.log(teacherSubject);
    if (!window.confirm("Are you sure to delete this assigned subject?")) {
        return;
    }

    const { teacher_id, faculty_id, department_id,semester, subject_id } = teacherSubject;

    const url = `/assignsubject/${teacher_id}/${faculty_id}/${department_id}/${semester}/${subject_id}`;


    Inertia.delete(url).then(() => {
      console.log('Subject deleted successfully');
      // You may want to redirect or perform any other action after successful deletion
    }).catch(error => {
      console.error('Error deleting subject:', error.response.data);
   });

   }



 return (

   <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
        Assgin Subject List
       </h2>
   }
   >

   <Head title="Assign Subject" />
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
        <div class="container">
          <div className='row'>
           <div class="col-md-12">
            <div class="row">
            <div className='col-md-2'>
              <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl d-flex flex-column">
                <h6 className="text-gray-500 mb-1">subject</h6>
                  <TextInput
                   className="form-control"
                   placeholder="Search..."
                   defaultValue={queryparams.subject}
                   onBlur={e => searchfeildchanged('subject',e.target.value)}
                   onKeyPress={e => onKeyPress('subject',e)}

                 />

              </div>
            </div>
            <div className='col-md-2'>
              <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl d-flex flex-column">
                <h6 className="text-gray-500 mb-1">department</h6>
                  <TextInput
                   className="form-control"
                   placeholder="Search..."
                   defaultValue={queryparams.department}
                   onBlur={e => searchfeildchanged('department',e.target.value)}
                   onKeyPress={e => onKeyPress('department',e)}

                 />

              </div>
            </div>
            <div className='col-md-2'>
              <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl d-flex flex-column">
                <h6 className="text-gray-500 mb-1">semester</h6>
                  <TextInput
                   className="form-control"
                   placeholder="Search..."
                   defaultValue={queryparams.semester}
                   onBlur={e => searchfeildchanged('semester',e.target.value)}
                   onKeyPress={e => onKeyPress('semester',e)}

                 />

              </div>

            </div>

            <div className='col-md-2'>
              <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl d-flex flex-column">
                <h6 className="text-gray-500 mb-1">teacher</h6>
                  <SelectInput
                   className="form-control"

                   defaultValue={queryparams.teacher}
                   onChange={(e) => searchfeildchanged("teacher",e.target.value)}
                 >
                <option value="" >Select</option>
                {teachers.map((teacher) => (
                  <option value={teacher.name} key={teacher.id}>{teacher.name}</option>


                ))

                }

                 </SelectInput>

              </div>

            </div>


             <div className='col-md-4 text-end'>
              <div className='me-3 mt-4'>
              <Link
                 href={route('assginsubject.create')}
                 className="bg-emerald-500 py-1  px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                >
               Assgin New Subject
            </Link>
            </div>


            <div class="mt-3 me-4">
               <Link
                 className="btn btn-outline-secondary py-1 px-3 rounded shadow transition-all hover:bg-gray-600"
                 href={route("assginsubject.index")}
               >
                Reset Page
               </Link>
            </div>

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
                    <th className="px-3 py-2 ">Subject</th>
                    <th className="px-3 py-2">Department</th>
                    <th className="px-3 py-2">Semester</th>
                    <th className="px-3 py-2">Teacher</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Action</th>
                  </tr>
                </thead>
             <tbody>

                {teacherSubjects !== undefined && teacherSubjects !== null ? (
                      teacherSubjects.data.map((teacherSubject) => (
                      <tr className="bg-gray border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200"
                       key={`${teacherSubject.teacher_id}-${teacherSubject.faculty_id}-${teacherSubject.department_id}-${teacherSubject.semester}-${teacherSubject.subject_id}`}
                      >
                           <td className="px-3 py-2">{teacherSubject.subject.name}</td>
                           <td className="px-3 py-2">{teacherSubject.department.name}</td>
                           <td className="px-3 py-2">{teacherSubject.semester}</td>
                           <td className="px-3 py-2">{teacherSubject.teacher.name}</td>
                           <td className="px-3 py-2">{teacherSubject.status}</td>
                           <td className="px-3 py-2">
                           <Link
                               href={route("assignsubject.edit", {
                                teacher_id: teacherSubject.teacher_id,
                                faculty_id: teacherSubject.faculty_id,
                                department_id: teacherSubject.department_id,
                                semester: teacherSubject.semester,
                                subject_id: teacherSubject.subject_id
                            })}
                           
                             className="font-meduim text-blue-600 dark:text-blue-500 hover:bg-gray-300 mx-1 btn btn-outline-primary"
                           >
                          Edit
                          </Link>

                         <DangerButton
                          onClick={ (e) => deleteSubject(teacherSubject)}
                          className="mx-3"
                         >
                          Delete
                        </DangerButton>

                           </td>

                      </tr>

                      ))

                ):(
                  <p>teacher subject is undefined</p>
                )

              }
                </tbody>

              </table>
               <Pagination links={teacherSubjects.meta.links}></Pagination>
            </div>



     </div>
     </div>
     </div>


   </AuthenticatedLayout>

 );
}
