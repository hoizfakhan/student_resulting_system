import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Head, Link } from "@inertiajs/react";

export default function ShowMarks({ auth, marks = {}, Sname, Lname,Sdepartment }) {
  // Function to calculate the total marks
  const calculateTotalMarks = (homeWork, classActivity, midterm, final) => {
    return (homeWork || 0) + (classActivity || 0) + (midterm || 0) + (final || 0);
  };

  // Function to calculate status based on total marks
  const calculateStatus = (homeWork, classActivity, midterm, final) => {
    const totalMarks = calculateTotalMarks(homeWork, classActivity, midterm, final);
    return totalMarks >= 55 ? 'Passed' : 'Failed';
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="container">
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Student Marks <span className="text-gray-500">({Sname} {Lname})</span>
       </h2>
       <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight ">
         <span className="text-emarled-300"> Department </span><span className="text-gray-500">({Sdepartment})</span>
       </h2>

      </div>
      }
    >
      <Head title="Student Marks" />
      <div className="py-12 ">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="container mt-2 mb-3 ms-2">
              {/* Optional content can go here */}
            </div>
            <div className="overflow-auto">
              <form onSubmit={(e) => e.preventDefault()}>
                {Object.keys(marks).length > 0 ? (
                  Object.keys(marks).map((semesterName) => (
                    <div key={semesterName} className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="text-center m-2"> Semester: <span className="text-gray-500">{semesterName}</span></span>
                      </h3>
                      <table className="w-full text-md text-left mt-4 rtl:text-right dark:bg-gray-700 dark:text-gray-300 mt-2">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-500 dark:text-gray-400 border-b-2 border-gray-500">
                          <tr className="bg-gray-700 text-white">
                            <th className="px-6 py-3 border-b-2 border-gray-200">Subject</th>
                            <th className="px-6 py-3 border-b-2 border-gray-200">Credit</th>
                            <th className="px-6 py-3 border-b-2 border-gray-200">Home Work (10%)</th>
                            <th className="px-6 py-3 border-b-2 border-gray-200">Attendance & Class Activity (10%)</th>
                            <th className="px-6 py-3 border-b-2 border-gray-200">Midterm Marks (20%)</th>
                            <th className="px-6 py-3 border-b-2 border-gray-200">Final Marks (60%)</th>
                            <th className="px-6 py-3 border-b-2 border-gray-200">Total Marks (100%)</th>
                            <th className="px-6 py-3 border-b-2 border-gray-200">Chance</th>
                            <th className="px-6 py-3 border-b-2 border-gray-200">Status</th>
                            <th className="px-6 py-3 border-b-2 border-gray-200">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {marks[semesterName].length > 0 ? (
                            marks[semesterName].map((mark, index) => (
                              <tr key={index} className={`hover:bg-gray-100 dark:hover:bg-gray-800 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                <td className="px-6 py-3 border-b border-gray-200">{mark.subject}</td>
                                <td className="px-6 py-3 border-b border-gray-200">{mark.credit}</td>
                                <td className="px-6 py-3 border-b border-gray-200">{mark.home_work || '-'}</td>
                                <td className="px-6 py-3 border-b text-center border-gray-200">{mark.class_activity || '-'}</td>
                                <td className="px-6 py-3 border-b border-gray-200">{mark.midterm || '-'}</td>
                                <td className="px-6 py-3 border-b border-gray-200">{mark.final || '-'}</td>
                                <td className="px-6 py-3 border-b border-gray-200">
                                  {calculateTotalMarks(
                                    mark.home_work,
                                    mark.class_activity,
                                    mark.midterm,
                                    mark.final
                                  )}
                                </td>
                                <td className="px-6 py-3 border-b border-gray-200">{mark.chance || '-'}</td>
                                <td className="px-6 py-3 border-b border-gray-200">
                                  <span className={`font-semibold ${calculateStatus(
                                    mark.home_work,
                                    mark.class_activity,
                                    mark.midterm,
                                    mark.final
                                  ) === 'Passed' ? 'text-green-600' : 'text-red-600'}`}>
                                    {calculateStatus(
                                      mark.home_work,
                                      mark.class_activity,
                                      mark.midterm,
                                      mark.final
                                    )}
                                  </span>
                                </td>
                                 <td className="px-6 py-3 border-b border-gray-200">
                                 <Link
                                   href=""
                                   className="text-blue-500 hover:text-blue-700"
                                 >
                                <FontAwesomeIcon icon={faEdit} />
                               </Link>
                                 </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="9" className="text-center px-6 py-3 border-b border-gray-200">No marks available</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-4">No marks available</p>
                )}
                <div className="mt-4 text-right">

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
