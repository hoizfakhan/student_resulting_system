import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import SuccessModal from "@/Pages/SuccessModal";
import ErrorModal from "@/Pages/ErrorModal";

export default function ShowMarks({
  auth,
  marks = {},
  success,
  error,
  studentId,
  Sname,
  Lname,
  Sdepartment,
  studentStatus // Add this prop
}) {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(success || null);
  const [errorMessage, setErrorMessage] = useState(error || null);

  // Function to calculate total marks for a subject
  const calculateTotalMarks = (homeWork, classActivity, midterm, final) => {
    return (homeWork || 0) + (classActivity || 0) + (midterm || 0) + (final || 0);
  };

  // Function to determine status based on total marks
  const determineStatus = (totalMarks) => {
    return totalMarks < 55 ? 'Failed' : 'Passed';
  };

  // Determine the message to show based on the student's status
  const statusMessage = () => {
    switch (studentStatus) {
      case 1:
        return null; // Status 1 means marks can be shown
      case 2:
        return "Congratulations! You have graduated successfully.";
      case 4:
        return "You have been dropped from the university due to multiple failures.";
      default:
        return "You do not have permission to view marks at this time.";
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="container">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            My Marks <span className="text-gray-500">({Sname} {Lname})</span>
          </h2>
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            <span className="text-emarled-300"> Department </span><span className="text-gray-500">({Sdepartment})</span>
          </h2>
        </div>
      }
    >
      <Head title="My Marks" />
      <div className="py-12">
        {successMessage && (
          <SuccessModal
            message={successMessage}
            onClose={() => setSuccessMessage(null)}
          />
        )}
        {errorMessage && (
          <ErrorModal
            message={errorMessage}
            onClose={() => setErrorMessage(null)}
          />
        )}
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="container mt-2 mb-3 ms-2">
              {/* Optional content can go here */}
            </div>
            <div className="overflow-auto">
              <form onSubmit={(e) => e.preventDefault()}>
                {statusMessage() ? (
                  <p className="text-center py-3 text-lg font-semibold text-gray-500">
                    {statusMessage()}
                  </p>
                ) : (
                  Object.keys(marks).length > 0 ? (
                    Object.keys(marks).map((semesterName) => {
                      const semesterData = marks[semesterName];
                      const semesterMarks = Array.isArray(semesterData.subjectMarks) ? semesterData.subjectMarks : [];
                      const percentage = semesterData.percentage; // Access the percentage for the semester
                      const failureCount = semesterData.failures_count || 0; // Ensure this value is defaulted to 0 if undefined

                      return (
                        <div key={semesterName} className="mb-6">
                          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                            <span className="text-center m-2">
                              <span className="text-gray-500">{semesterName}</span>
                              {failureCount > 0 && (
                                <span className="ml-2 text-red-500 font-semibold">(Repeated {failureCount} {failureCount > 1 ? 'times' : 'time'})</span>
                              )}
                            </span>
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
                              </tr>
                            </thead>
                            <tbody>
                              {semesterMarks.length > 0 ? (
                                semesterMarks.map((mark, index) => {
                                  const totalMarks = calculateTotalMarks(
                                    mark.home_work,
                                    mark.class_activity,
                                    mark.midterm,
                                    mark.final
                                  );

                                  return (
                                    <tr key={index} className={`hover:bg-gray-100 dark:hover:bg-gray-800 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                      <td className="px-6 py-3 border-b border-gray-200">{mark.subject}</td>
                                      <td className="px-6 py-3 border-b border-gray-200">{mark.credit}</td>
                                      <td className="px-6 py-3 border-b border-gray-200">{mark.home_work || '-'}</td>
                                      <td className="px-6 py-3 border-b border-gray-200">{mark.class_activity || '-'}</td>
                                      <td className="px-6 py-3 border-b border-gray-200">{mark.midterm || '-'}</td>
                                      <td className="px-6 py-3 border-b border-gray-200">{mark.final || '-'}</td>
                                      <td className="px-6 py-3 border-b border-gray-200">{totalMarks}</td>
                                      <td className="px-6 py-3 border-b border-gray-200">{mark.chance || '-'}</td>
                                      <td className="px-6 py-3 border-b border-gray-200">
                                        <span className={`font-semibold ${determineStatus(totalMarks) === 'Passed' ? 'text-green-600' : 'text-red-600'}`}>
                                          {determineStatus(totalMarks)}
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr>
                                  <td colSpan="9" className="text-center px-6 py-3 border-b border-gray-200">No marks available</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                          <p className="text-center mt-4 text-lg font-semibold text-gray-500">Semester Percentage: {percentage.toFixed(2)}%</p>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center py-3">No marks available for this student</p>
                  )
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
