import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function teacher ({auth,teachersubjects})
{

     console.log(teachersubjects);
  return (
    <AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Assigned Subjects </h2>}

    >
     <Head title="My Subjects" />

  <div className="py-12">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
        <div className='overflow-auto'>
                <table className='w-full text-md text-left rtl:text-right
                     dark:bg-gray-700 dark:text-gray-300 '>
                   <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400
                        border-b-2 border-gray-500'>
                      <tr className='text-nowrap bg-gray-500 text-white align-middle'>
                      <th className='px-3 py-2'> Subject</th>
                        <th className='px-3 py-2'>Faculty</th>
                        <th className='px-3 py-2'>Department</th>
                        <th className='px-3 py-2'>Semester</th>
                        <th className='px-3 py-2'>Subject Type</th>
                        <th className='px-3 py-2'>Credit</th>
                        <th className='px-3 py-2'>Practical Credit</th>
                        <th className='px-3 py-2'>Theoretical Credit</th>


                      </tr>
                   </thead>

                {teachersubjects !== undefined && teachersubjects!== null ? (
                      teachersubjects.data.map((teachersubject,index) => (
                      <tr className="bg-gray border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200"
                       key={index}
                      >
                          <td className="px-3 py-2">{teachersubject.name}</td>
                           <td className="px-3 py-2">{teachersubject.faculty.name}</td>
                           <td className="px-3 py-2 text-center">{teachersubject.department.name}</td>
                           <td className="px-3 py-2 text-center">{teachersubject.semester}</td>
                           <td className="px-3 py-2">{teachersubject.subject_type}</td>
                           <td className="px-3 py-2 text-center">{teachersubject.credit}</td>
                           <td className="px-3 py-2 text-center">{teachersubject.practical_credit}</td>
                           <td className="px-3 py-2 text-center">{teachersubject.therical_credit}</td>
                      </tr>

                      ))

                ):(
                  <p>teacher subject is undefined</p>
                )

              }

                </table>

           </div>
       </div>
    </div>
</div>

    </AuthenticatedLayout>
  );

}
