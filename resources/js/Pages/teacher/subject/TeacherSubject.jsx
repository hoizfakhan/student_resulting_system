// teacher.js

import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Teacher({ auth, teachersubjects }) {





  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Assigned Subjects</h2>}
    >
      <Head title="My Subjects" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className='overflow-auto'>
              <table className='w-full text-md text-left rtl:text-right dark:bg-gray-700 dark:text-gray-300'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400 border-b-2 border-gray-500'>
                  <tr className='text-nowrap bg-gray-500 text-white align-middle'>
                    <th className='px-3 py-2'>Subject</th>
                    <th className='px-3 py-2'>Faculty</th>
                    <th className='px-3 py-2'>Department</th>
                    <th className='px-3 py-2'>Semester</th>
                    <th className='px-3 py-2'>Credit</th>
                    <th className='px-3 py-2'>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {teachersubjects && teachersubjects.data.map((teachersubject, index) => (
                    <tr className="bg-gray border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200" key={index}>
                      <td className="px-3 py-2">{teachersubject.name}</td>
                      <td className="px-3 py-2 text-center">{teachersubject.facultys.length > 0 ? teachersubject.facultys[0].name : '-'}</td>
                      <td className="px-3 py-2 text-center">{teachersubject.departments.length > 0 ? teachersubject.departments[0].name : '-'}</td>
                      <td className="px-3 py-2 text-center">{teachersubject.semesters.length > 0 ? teachersubject.semesters[0].name : '-'}</td>
                      <td className="px-3 py-2 text-center">{teachersubject.credit}</td>
                      <td className="px-3 py-2 text-center">
                        <Link
                            href={route('attendence.create', {
                              department_id: teachersubject.departments.length > 0 ? teachersubject.departments[0].id : null,
                              semester_id: teachersubject.semesters.length > 0 ? teachersubject.semesters[0].id : null,
                              subject_id:teachersubject.id,
                            })}
                          className='font-medium text-blue-600 rounded-sm dark:text-blue-500 hover:bg-gray-300 mx-1 btn btn-outline-primary'>

                          Assign Attendance
                        </Link>
                        <Link
                          href={route('marks.create', {
                            department_id: teachersubject.departments.length > 0 ? teachersubject.departments[0].id : null,
                            semester_id: teachersubject.semesters.length > 0 ? teachersubject.semesters[0].id : null,
                            subject_id:teachersubject.id,
                          })}
                         className='font-medium text-blue-600 rounded-sm dark:text-blue-500 hover:bg-gray-300 mx-1 btn btn-outline-success'>
                          Assign Score
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
