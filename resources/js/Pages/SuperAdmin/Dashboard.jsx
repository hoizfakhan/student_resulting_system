import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth,

  totalfaculty,
  totalfacultymanager,
  totaldepartment,
  totalstudents,
  newstudents,
  graduatedstudents,
  totalteachers,

})

  {

  console.log(newstudents);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Super Admin Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 py-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    {/* Card for Total Faculty */}
    <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
        <div className="flex items-center">
            <div className="flex-shrink-0">
                <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12h2l-1 9H7l-1-9h2m2 0V7h4v5m1 5h2m-8-5H5m14 0h-2m-6 0h6M5 9h14"></path></svg>
            </div>
            <div className="ml-4">
                <h3 className='text-white text-xl font-semibold'>
                    Total Faculty
                </h3>
                <p className='text-2xl text-white font-bold mt-3'>
                    {totalfaculty}
                </p>
            </div>
        </div>
    </div>

    {/* Card for Total Faculty Manager */}
    <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
        <div className="flex items-center">
            <div className="flex-shrink-0">
                <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-3-3H5a3 3 0 00-3 3v2h5m7 0v-5a3 3 0 00-3-3 3 3 0 00-3 3v5m3-10a4 4 0 110-8 4 4 0 010 8z"></path></svg>
            </div>
            <div className="ml-4">
                <h3 className='text-white text-xl font-semibold'>
                    Total Faculty Manager
                </h3>
                <p className='text-2xl text-white font-bold mt-3'>
                    {totalfacultymanager}
                </p>
            </div>
        </div>
    </div>

    {/* Card for Total Department */}
    <div className="bg-gradient-to-r from-yellow-400 to-red-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
        <div className="flex items-center">
            <div className="flex-shrink-0">
                <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h4V5a2 2 0 012-2h6a2 2 0 012 2v5h4m-6 0v6m-4 4h4m-6-4v4m2-4v4m-6-4a2 2 0 012-2h10a2 2 0 012 2v4m-2-4a2 2 0 00-2-2h-4a2 2 0 00-2 2v4"></path></svg>
            </div>
            <div className="ml-4">
                <h3 className='text-white text-xl font-semibold'>
                    Total Department
                </h3>
                <p className='text-2xl text-white font-bold mt-3'>
                    {totaldepartment}
                </p>
            </div>
        </div>
    </div>

    <div className="bg-gradient-to-r from-yellow-400 to-red-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
        <div className="flex items-center">
            <div className="flex-shrink-0">
                <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h4V5a2 2 0 012-2h6a2 2 0 012 2v5h4m-6 0v6m-4 4h4m-6-4v4m2-4v4m-6-4a2 2 0 012-2h10a2 2 0 012 2v4m-2-4a2 2 0 00-2-2h-4a2 2 0 00-2 2v4"></path></svg>
            </div>
            <div className="ml-4">
                <h3 className='text-white text-xl font-semibold'>
                    Total Students
                </h3>
                <p className='text-2xl text-white font-bold mt-3'>
                    {totalstudents}
                </p>
            </div>
        </div>
    </div>

    <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
        <div className="flex items-center">
            <div className="flex-shrink-0">
                <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h4V5a2 2 0 012-2h6a2 2 0 012 2v5h4m-6 0v6m-4 4h4m-6-4v4m2-4v4m-6-4a2 2 0 012-2h10a2 2 0 012 2v4m-2-4a2 2 0 00-2-2h-4a2 2 0 00-2 2v4"></path></svg>
            </div>
            <div className="ml-4">
                <h3 className='text-white text-xl font-semibold'>
                    New Registered Students
                </h3>
                <p className='text-2xl text-white font-bold mt-3'>
                    {newstudents}
                </p>
            </div>
        </div>
    </div>


    <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
        <div className="flex items-center">
            <div className="flex-shrink-0">
                <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h4V5a2 2 0 012-2h6a2 2 0 012 2v5h4m-6 0v6m-4 4h4m-6-4v4m2-4v4m-6-4a2 2 0 012-2h10a2 2 0 012 2v4m-2-4a2 2 0 00-2-2h-4a2 2 0 00-2 2v4"></path></svg>
            </div>
            <div className="ml-4">
                <h3 className='text-white text-xl font-semibold'>
                    Graduated Students
                </h3>
                <p className='text-2xl text-white font-bold mt-3'>
                    {graduatedstudents}
                </p>
            </div>
        </div>
    </div>

    <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
        <div className="flex items-center">
            <div className="flex-shrink-0">
                <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h4V5a2 2 0 012-2h6a2 2 0 012 2v5h4m-6 0v6m-4 4h4m-6-4v4m2-4v4m-6-4a2 2 0 012-2h10a2 2 0 012 2v4m-2-4a2 2 0 00-2-2h-4a2 2 0 00-2 2v4"></path></svg>
            </div>
            <div className="ml-4">
                <h3 className='text-white text-xl font-semibold'>
                    Total Teachers
                </h3>
                <p className='text-2xl text-white font-bold mt-3'>
                    {totalteachers}
                </p>
            </div>
        </div>
    </div>
            </div>


            </div>
        </AuthenticatedLayout>
    );
}
