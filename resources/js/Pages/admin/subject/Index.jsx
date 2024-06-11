import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import DangerButton from "@/Components/DangerButton";

export default function ({auth,success,error,subjects}) {
  const deleteSubject = (subject) => {
    console.log(subject);
    if (!window.confirm("Are you sure to delete this subject from the Curreculm?")) {
      return;
    }

    router.delete(route("subject.destroy", subject.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Subjects
        </h2>
      }
    >
      <Head title="Subjects" />
      <div className="py-12">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-500 py-2 px-4 text-white rounded mb-4">
              {error}
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="row">
              <div className="col-md-6">
                <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl">
                  Subjects List
                </div>
              </div>
              <div className="col-md-6 text-end ">
                <div className="me-3 mt-4">
                  <Link
                    href={route("subject.create")}
                    className="bg-emerald-500 py-1  px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                  >
                    Add New Subject
                  </Link>
                </div>
              </div>
            </div>

            <div className="overflow-auto">
              <table
                className="w-full text-md text-left rtl:text-right
                     dark:bg-gray-700 dark:text-gray-300 "
              >
                <thead
                  className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400
                        border-b-2 border-gray-500"
                >
                  <tr className="text-nowrap bg-gray-500 text-white align-middle">
                    <th className="px-3 py-2 ">Name</th>
                    <th className="px-3 py-2">Faculty</th>
                    <th className="px-3 py-2">Department</th>
                    <th className="px-3 py-2"> Semester</th>
                    <th className="px-3 py-2">Credit</th>
                    <th className="px-3 py-2 ">Practical Credit</th>
                    <th className="px-3 py-2">Theoretical Credit</th>
                    <th className="px-3 py-2">Type</th>
                    <th className="px-3 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.data.map((subject) => (
                    <tr
                      className="bg-gray border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 align-middle"
                      key={subject.id}
                    >
                      <td className="px-3 py-2">{student.name}</td>
                      <td className="px-3 py-2">{student.faculty}</td>
                      <td className="px-3 py-2">{student.department}</td>
                      <td className="px-3 py-2">{student.semester}</td>
                      <td className="px-3 py-2">{student.credit}</td>
                      <td className="px-3 py-2">{student.practical_credit}</td>
                      <td className="px-3 py-2">{student.theoretical_credit_credit}</td>
                      <td className="px-3 py-2">{subject_type}</td>
                      <td className="px-3 py-2 text-nowrap">
                        

                        <Link
                          href={route("subject.edit", subject.id)}
                          className="font-meduim text-blue-600 dark:text-blue-500 hover:bg-gray-300 mx-1 btn btn-outline-primary"
                        >
                          Edit
                        </Link>

                        <DangerButton
                          onClick={(e) => deleteSubject(subject)}
                          className="mx-3"
                        >
                          Delete
                        </DangerButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination links={students.meta.links}></Pagination>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
