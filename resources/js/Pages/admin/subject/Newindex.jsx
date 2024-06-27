import DangerButton from "@/Components/DangerButton";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router} from "@inertiajs/react";
import SuccessModal from "@/Pages/SuccessModal";
import ErrorModal from "@/Pages/ErrorModal";
import { useEffect, useState } from "react";
export default function Newindex({auth,subjects,queryparams = null,departments,success,error}){

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
   const searchfeildchanged = (name,value) =>{
    if(value){
      queryparams[name] = value;
    }
    else{
      delete queryparams[name]
    }

    router.get(route('subject.index'),queryparams);

   }

   const onKeyPress = (name,e) =>{

     if(e.key !== 'Enter') return;

     searchfeildchanged(name,e.target.value);

   }

   const deleteSubject = (subject) =>{

    if(!window.confirm("Are you sure to delete this subject from system?")){
     return;
     }

    router.delete(route("subject.destroy",subject.id));

    }

 return (
  <AuthenticatedLayout
    user={auth.user}
    header={
    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
      Subjects
    </h2>
  }

  >
      <Head title="Subjects" />
      <div className="py-12">
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

        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
        <div class="container mb-4">
          <div className='row'>
           <div class="col-md-12">
            <div class="row">
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
                <h6 className="text-gray-500 mb-1">department</h6>
                  <SelectInput
                   className="form-control"
                   placeholder="Search..."
                   defaultValue={queryparams.department}
                   onChange={(e) => searchfeildchanged('department',e.target.value)}

                 >
                    <option>Search..</option>
                    {departments.map((department) => (

                       <option value={department.name} key={department.id}>{department.name}</option>

                    ))

                    }

                 </SelectInput>

              </div>
            </div>
            <div className='col-md-2'>
              <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl d-flex flex-column">
                <h6 className="text-gray-500 mb-1">semester</h6>
                  <TextInput
                   className="form-control"
                   placeholder="Search..."
                  type="number"
                  defaultValue={queryparams.semester}
                   onBlur={e => searchfeildchanged('semester',e.target.value)}
                   onKeyPress={e => onKeyPress('semester',e)}
                 />

              </div>
            </div>

            <div class="col-md-2 mt-5">
               <Link
                 className="btn btn-outline-secondary"
                 href={route("subject.index")}
               >
                Reset
               </Link>
            </div>

             <div className='col-md-4 text-end'>
              <div className='me-3 mt-4'>
              <Link
                 href={route('subject.create')}
                 className="bg-emerald-500 py-1  px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                >
               Add New Subject
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
                  <tr className="text-nowrap bg-gray-500 text-white align-middle">
                    <th className="px-3 py-2 ">Name</th>
                    <th className="px-3 py-2">Department</th>
                    <th className="px-3 py-2"> Semester</th>
                    <th className="px-3 py-2">Credit</th>
                    <th className="px-3 py-2 ">Practical Credit</th>
                    <th className="px-3 py-2">Theoretical Credit</th>
                    <th className="px-3 py-2">Type</th>
                    <th className="px-3 py-2">Action</th>
                  </tr>
                </thead>
               <tbody>
                  {subjects.data.map((subject) => (
                    <tr
                      className="bg-gray border-b dark:bg-gray-800  dark:border-gray-700 hover:bg-gray-200 align-middle"
                      key={subject.id}
                    >
                      <td className="px-3 py-2">{subject.name}</td>
                      <td className="px-3 py-2 text-center">{subject.department.name}</td>
                      <td className="px-3 py-2 text-center">{subject.semester}</td>
                      <td className="px-3 py-2 text-center">{subject.credit}</td>
                      <td className="px-3 py-2 text-center">{subject.practical_credit}</td>
                      <td className="px-3 py-2 text-center">{subject.therical_credit}</td>
                      <td className="px-3 py-2">{subject.subject_type}</td>
                      <td className="px-3 py-2 text-nowrap">


                        <Link
                          href={route("subject.edit", subject.id)}
                          className="font-meduim text-blue-600 dark:text-blue-500 hover:bg-gray-300 mx-1 btn btn-outline-primary"
                        >
                          Edit
                        </Link>

                        <DangerButton
                          onClick={(e) => deleteSubject(subject)}
                          className="mx-3"
                        >
                          Delete
                        </DangerButton>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
             <Pagination links={subjects.meta.links}></Pagination>
            </div>
          </div>
          </div>
          </div>

  </AuthenticatedLayout>

 );

}
