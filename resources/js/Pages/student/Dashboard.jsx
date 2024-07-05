import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Student Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged In !</div>

                        <div className='overflow-auto'>
                <table className='w-full text-md text-left rtl:text-right
                     dark:bg-gray-700 dark:text-gray-300 '>
                   <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400
                        border-b-2 border-gray-500'>
                      <tr className='text-nowrap bg-gray-500 text-white align-middle'>
                       <th className='px-3 py-2 '>شماره</th>
                        <th className='px-3 py-2 '>نام مضمون</th>
                        <th className='px-3 py-2'>کریډت</th>
                        <th className='px-3 py-2'>حاضر</th>
                        <th className='px-3 py-2'>غیر حاضر</th>
                        <th className='px-3 py-2'>کارخانګي (10%)</th>
                        <th className='px-3 py-2'>فعالیت صنفی(10%)</th>
                        <th className='px-3 py-2'>امتحان وسط(20%)</th>
                        <th className='px-3 py-2'>امتحان فاینل(60%)</th>
                        <th className='px-3 py-2'>مجموعه(100%)</th>
                        <th className='px-3 py-2'>چانس دو(100%)</th>
                        <th className='px-3 py-2'>چانس سه(100%)</th>
                        <th className='px-3 py-2'>چانس چهار(100%)</th>
                        <th className='px-3 py-2'>وضعیت(100%)</th>
                      </tr>
                   </thead>
                    {/* <tbody>
                      {students.data.map((student) => (

                          <tr className='bg-gray border-b dark:bg-gray-800  dark:border-gray-700 hover:bg-gray-200 align-middle' key={student.id}>
                           <td className='px-3 py-2'>{student.id}</td>
                           <td className='px-3 py-2'>{student.name}</td>
                           <td className='px-3 py-2 text-center'>{student.father_name}</td>
                           <td className='px-3 py-2 text-center'>{student.department.name}</td>
                           <td className='px-3 py-2 text-center'>{student.current_semester}</td>
                           <td className='px-3 py-2'>{student.phone_number}</td>
                           <td className='px-3 py-2 text-center'>{student.kankor_id}</td>
                           <td className='px-3 py-2 text-nowrap'>

                           

                            

                            
                           </td>
                         </tr>
                      ))}
                    </tbody> */}
                </table>

                
           </div>
                       </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
