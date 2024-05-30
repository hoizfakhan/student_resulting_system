import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth,

  totalfaculty,
  totalfacultymanager,
  totaldepartment

})

  {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Super Admin Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-3 ">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                          <h3 className='text-amber-500 text-xl font-semibold'>
                            Total Faculty
                          </h3>
                          <p className='text-xl mt-3 '>
                            {totalfaculty}
                          </p>
                          </div>
                       </div>

                       <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                          <h3 className='text-amber-500 text-xl font-semibold'>
                            Total Faculty Manager
                          </h3>
                          <p className='text-xl mt-3 '>
                            {totalfacultymanager}
                          </p>
                          </div>
                       </div>

                       <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                          <h3 className='text-amber-500 text-xl font-semibold'>
                            Total Department
                          </h3>
                          <p className='text-xl mt-3 '>
                            {totaldepartment}
                          </p>
                          </div>
                       </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
