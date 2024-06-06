import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DangerButton from '@/Components/DangerButton';
import Pagination from '@/Components/Pagination';
import { Head, Link, router } from '@inertiajs/react';

export default function Departmentshow({auth,success,departments,fname}){

  const deletedepartment = (department) => {
     if(!window.confirm("Are you sure to delete this department?")){
       return;
     }

     router.delete(route('department.destroy',department.id));

    }

 return (

  <AuthenticatedLayout
  user={auth.user}
  header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"> "{fname}" Faculty Departments</h2>}


   >
     <Head title="Faculty Department" />
    <div className="py-12">
     <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
      {success && (
           <div className='bg-emerald-500 py-2 px-4 text-white rounded mb-4'>
            {success}
           </div>
       )}
     <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

        <div className='row'>
            <div className='col-md-6'>
              <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl">Department List</div>
            </div>

             <div className='col-md-6 text-end '>
              <div className='me-3 mt-4'>
              <Link
                 href={route("department.create")}
                 className="bg-emerald-500 py-1  px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                >
               Add New Department
            </Link>
          </div>

       </div>
     </div>

     <div className='overflow-auto'>
                <table className='w-full text-md text-left rtl:text-right
                     dark:bg-gray-700 dark:text-gray-300 '>
                   <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400
                        border-b-2 border-gray-500'>
                      <tr className='text-nowrap  bg-gray-500 text-white'>

                        <th className='px-3 py-2'>Name</th>
                        <th className='px-3 py-2'>Head</th>
                        <th className='px-3 py-2'>Created Date</th>
                        <th className='px-3 py-2'>Action</th>
                      </tr>
                   </thead>
                    <tbody>
                      {departments.data.map((department) => (

                          <tr className='bg-gray border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200' key={department.id}>

                           <td className='px-3 py-2'>{department.name}</td>
                           <td className='px-3 py-2'>{department.head}</td>
                           <td className='px-3 py-2'>{department.created_at}</td>
                           <td className='px-3 py-2 text-nowrap'>
                            <Link
                              href={route("department.edit",department.id)}
                              className='font-meduim text-blue-600 dark:text-blue-500 hover:bg-gray-300 mx-2   btn btn-outline-primary'
                            >
                             Edit
                            </Link>

                            <DangerButton
                              onClick={(e) => deletedepartment(department)}
                             >
                              Delete
                            </DangerButton>


                           </td>
                         </tr>

                      ))}
                    </tbody>
                </table>
                <Pagination links={departments.meta.links}></Pagination>

           </div>
        </div>
    </div>
   </div>
  </AuthenticatedLayout>

 );

}
