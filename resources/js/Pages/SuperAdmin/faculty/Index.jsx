import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, router } from '@inertiajs/react';
import DangerButton from '@/Components/DangerButton';
import Pagination from '@/Components/Pagination';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';



export default function Index({auth,success,facultys,error}){

   const deletefaculty = (faculty) =>{
   if(!window.confirm("Are you sure to delete this faculty?")){
    return;
    }

    router.delete(route("faculty.destroy",faculty.id));

   }

 return (

  <AuthenticatedLayout

    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Faculty</h2>}

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
            <div className='row'>
            <div className='col-md-6'>
              <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl">Faculty List</div>
            </div>

             <div className='col-md-6 text-end '>
              <div className='me-3 mt-4'>
              <Link
                 href={route('faculty.create')}
                 className="bg-emerald-500 py-1  px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                >
                Add New Faculty
            </Link>
            </div>
            </div>
            </div>

            <div className='overflow-auto'>
                <table className='w-full text-md text-left rtl:text-right
                     dark:bg-gray-700 dark:text-gray-300 '>
                   <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400
                        border-b-2 border-gray-500'>
                      <tr className='text-nowrap bg-gray-500 text-white'>
                        <th className='px-3 py-2 '>Name</th>
                        <th className='px-3 py-2'>Boss</th>
                        <th className='px-3 py-2'>Created Date</th>
                        <th className='px-3 py-2'>Updated Date</th>
                        <th className='px-3 py-2'>Action</th>
                      </tr>
                   </thead>
                    <tbody>
                      {facultys.data.map((faculty) => (

                          <tr className='bg-gray border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200' key={faculty.id}>
                           <td className='px-3 py-2'>{faculty.name}</td>
                           <td className='px-3 py-2'>{faculty.boss}</td>
                           <td className='px-3 py-2'>{faculty.created_at}</td>
                           <td className='px-3 py-2'>{faculty.updated_at}</td>
                           <td className='px-3 py-2 text-nowrap'>
                            <Link
                              href={route("faculty.edit",faculty.id)}
                              className='font-meduim text-blue-600 dark:text-blue-500 hover:bg-gray-300 mx-1 btn btn-outline-primary'

                            >
                             Edit
                            </Link>

                            <DangerButton
                             onClick={(e) => deletefaculty(faculty)}
                             className='mx-3'
                             >
                              Delete
                            </DangerButton>

                            <Link
                              href={route("faculty.show",faculty.id)}
                              className='font-meduim text-blue-600 dark:text-blue-500 hover:bg-gray-300 mx-1 btn btn-secondary'

                             >
                             Departments
                            </Link>

                           </td>
                         </tr>

                      ))}
                    </tbody>
                </table>
                <Pagination links={facultys.meta.links}></Pagination>
           </div>
      </div>
    </div>
  </div>


  </AuthenticatedLayout>


 );


}

