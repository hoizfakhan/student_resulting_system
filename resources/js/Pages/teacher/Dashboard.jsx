import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Teacher Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged In !</div>

                        <form className='mb-5 ms-4 me-4'>
                           <div>
                          <InputLabel>name</InputLabel>
                          <TextInput type='text' className='form-control' />
                          </div>

                          <div>
                          <InputLabel>email</InputLabel>
                          <TextInput type='text' className='form-control' />
                          </div>

                          <button className='btn btn-success mt-3'>add</button>
                          <button className='btn btn-danger mt-3'>remove</button>


                        </form>
                       </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
