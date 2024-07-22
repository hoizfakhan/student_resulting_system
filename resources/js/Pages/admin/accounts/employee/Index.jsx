import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import Pagination from "@/Components/Pagination";
import SuccessModal from "@/Pages/SuccessModal";
import ErrorModal from "@/Pages/ErrorModal";
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ({ auth,users, success, error }) {

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
  const deleteUser = (user) =>{
    console.log(account);
  if(!window.confirm("Are you sure to delete this faculty?")){
   return;
   }

   router.delete(route("employeeaccount.destroy",user.id));

  }
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Employee Accounts
        </h2>
      }
    >
      <Head title="Employee Account" />

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
            <div className='col-md-6'>
              <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl">Employees Accounts</div>
            </div>
            <div className='col-md-6 text-end '>
              <div className='me-3 mt-4'>
            <Link
              href={route("employeeaccount.create")}
              className="bg-emerald-500 py-1  px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
            >
              <FontAwesomeIcon icon={faUserPlus} className="ms-2" />
            </Link>
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
                    <th className="px-3 py-2 ">Name</th>
                    <th className="px-3 py-2">Email</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Action</th>
                  </tr>
                </thead>
             
              </table>
              {/* <Pagination links={users.meta.links}></Pagination> */}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
