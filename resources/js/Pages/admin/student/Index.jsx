import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function ({ auth }) {
  const { students } = usePage().props;
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Student list
        </h2>
      }
    >
      <Head title="Faculty" />

      <div className="py-12">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <Link
              href={route("student.create")}
              className="bg-emerald-500 py-1  px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
            >
              Register Student
            </Link>
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
                    <th className="px-3 py-2">Last Name</th>
                    <th className="px-3 py-2">Father Name </th>
                    <th className="px-3 py-2">Phone</th>
                    <th className="px-3 py-2 ">Department</th>
                    <th className="px-3 py-2">Semester</th>
                    <th className="px-3 py-2"> complete Info</th>
                  
                    
                  </tr>
                </thead>
                <tbody>
                {students.map(student => (
            <tr className="bg-gray border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200" key={student.id}>
              <td className='px-3 py-2'>{student.firstname}</td>
              <td className='px-3 py-2'>{student.lastname}</td>
              <td className='px-3 py-2'>{student.father_name}</td>
              <td className='px-3 py-2'>{student.phone}</td>
              <td className='px-3 py-2'>{student.department}</td>
              <td className='px-3 py-2'>{student.current_semester}</td>
              <td className='px-3 py-2 text-nowrap' >
                <Link href={`/students/${student.id}`}>See More Info</Link>
              </td>
            </tr>
          ))}
                </tbody>
              </table>
              {/* <Pagination links={student.meta.links}></Pagination> */}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
