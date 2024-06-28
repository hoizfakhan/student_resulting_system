import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import Pagination from "@/Components/Pagination";
import DangerButton from "@/Components/DangerButton";
import TextInput from "@/Components/TextInput";
export default function Index({ auth,users,success,error,studentaccounts,queryparams = null }) {
  queryparams = queryparams || {}

 const searchfeildchanged = (name,value) => {

  if(value){
    queryparams[name] = value;

  }else{
    delete queryparams[name];
  }

   router.get(route("studentaccount.index",queryparams));
  }

 const onKeyPress = (name,e) => {
  if(e.key !== 'Enter') return

  searchfeildchanged(name,e.target.value);


 }

  const deleteStudent = (studentaccount) =>{
  if(!window.confirm("Are you sure to delete this account?")){
   return;
   }

   router.delete(route("studentaccount.destroy",studentaccount.id));

  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Student Accounts
        </h2>
      }
    >
      <Head title="Faculty" />

      <div className="py-12">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
        {success && (
              <div className='bg-emerald-500 py-2 px-4 text-white rounded mb-4'>
               {success}
              </div>
        )}

         {error && (
              <div className='bg-red-500 py-2 px-4 text-white rounded mb-4'>
               {error}
               </div>
         )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div className="container">
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
                <h6 className="text-gray-500 mb-1">email</h6>
                  <TextInput
                   className="form-control"
                   placeholder="Search..."
                   defaultValue={queryparams.email}
                   onBlur={e => searchfeildchanged('email',e.target.value)}
                   onKeyPress={e => onKeyPress('email',e)}

                 />

              </div>
            </div>
            <div className='col-md-2'>
              <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl d-flex flex-column">
                <h6 className="text-gray-500 mb-1">status</h6>
                  <TextInput
                   className="form-control"
                   placeholder="Search..."
                   defaultValue={queryparams.status}
                   onBlur={e => searchfeildchanged('status',e.target.value)}
                   onKeyPress={e => onKeyPress('status',e)}

                 />

              </div>

            </div>

            <div className="col-md-2 mt-5">
               <Link
                 className="btn btn-outline-primary"
                 href={route("studentaccount.index")}
               >
                Reset
               </Link>
            </div>

             <div className='col-md-4 text-end'>
              <div className='me-3 mt-4'>
              <Link
                 href={route('studentaccount.create')}
                 className="bg-emerald-500 py-1  px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                >
               Create New Account
            </Link>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>

            {/* //table for showing Accounts */}
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
                    <th className="px-3 py-2">Email</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Action</th>
                  </tr>
                </thead>
             <tbody>
                  {studentaccounts.data.map((studentaccount) => (
                    <tr
                      className="bg-gray border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200"
                      key={studentaccount.id}
                    >
                      <td className="px-3 py-2">{studentaccount.id}</td>
                      <td className="px-3 py-2">{studentaccount.name}</td>
                      <td className="px-3 py-2">{studentaccount.email}</td>
                     <td className="px-3 py-2">

                        {studentaccount.status === 'active' ? (
                          <span>Active</span>
                       ):(
                        <span>Inactive</span>
                       )}

                      </td>

                      <td className="px-3 py-2 text-nowrap">
                        <Link
                          href={route("studentaccount.edit",studentaccount.id)}
                          className="font-meduim text-blue-600 dark:text-blue-500 hover:bg-gray-300 mx-1 btn btn-outline-primary"
                        >
                          Edit
                        </Link>

                        <DangerButton
                          onClick={ (e) => deleteStudent(studentaccount)}
                          className="mx-3"
                        >
                          Delete
                        </DangerButton>

                           <Link
                            href={route("blockstudentaccount",studentaccount.id)}
                            className="font-meduim text-blue-600 dark:text-blue-500 hover:bg-gray-300 mx-1 btn btn-outline-secondary"
                            >
                           Block Account
                        </Link>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
               <Pagination links={studentaccounts.meta.links}></Pagination>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
