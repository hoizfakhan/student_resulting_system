
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Faculty Manager</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                          <div className='row'>
                             <div className='col-md-6'>
                             <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl">Faculty manager list</div>
                            </div>

                          <div className='col-md-6 text-end '>
                           <div className='me-3 mt-4'>
                            <Link
                             href={route('manager.create')}
                            className="bg-emerald-500 py-1  px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                            >
                           Add New Manager
                         </Link>
                       </div>
                     </div>
                  </div>


                </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
