import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SuccessModal from "@/Pages/SuccessModal";
import ErrorModal from "@/Pages/ErrorModal";
import { useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function Create({ auth, students, subject, subjectid, semester, department, success, error }) {
  console.log(students);
  const calculateCompletionStatus = (absentHours, totalHours) => {
    console.log(absentHours);
    const attendancePercentage = ((absentHours / totalHours) * 100);
    return attendancePercentage > 25 ? 'uncompleted' : 'completed';
  };

  const initialAttendances = students.data.map(student => {
    const attendance = student.attendence && student.attendence.length > 0 ? student.attendence[0] : { total_hours: '', absent_hours: '' };
    return {
      student_id: student.id,
      total_hours: attendance.total_hours || '',
      absent_hours: attendance.absent_hours || '',
      present_hours: (attendance.total_hours || 0) - (attendance.absent_hours || 0)
    };
  });

  const { data, setData, post, errors, reset } = useForm({
    student_id: "",
    subject_id: subjectid || "",
    semester: semester || "",
    attendence_year: new Date().getFullYear(),
    attendances: initialAttendances,
  });

  const [successMessage, setSuccessMessage] = useState(success || null);
  const [errorMessage, setErrorMessage] = useState(error || null);

  useEffect(() => {
    if (success) {
      setSuccessMessage(success);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  const handleArrayChange = (e, studentId, field) => {
    const { value } = e.target;

    const updatedAttendances = data.attendances.map(attendance => {
      if (attendance.student_id === studentId) {
        const updatedAttendance = {
          ...attendance,
          [field]: value,
          present_hours: (field === 'total_hours' ? parseInt(value, 10) || 0 : attendance.total_hours) - (field === 'absent_hours' ? parseInt(value, 10) || 0 : attendance.absent_hours)
        };
        return updatedAttendance;
      }
      return attendance;
    });

    setData({ ...data, attendances: updatedAttendances });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    post(route('attendence.store1', [data.subject_id, data.semester]));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Student Attendance</h2>}
    >
      <Head title="Student Attendance" />
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
              <div className="row">
                <div className="col-md-3">
                  <span className="text-gray-800">Subject</span>: <span className="mt-3 text-gray-500">{subject}</span>
                </div>
                <div className="col-md-3 ms-2">
                  Department: <span className="mt-3 text-gray-500">{department}</span>
                </div>
                <div className="col-md-3 ms-2">
                  Semester: <span className="mt-3 text-gray-500">{semester}</span>
                </div>
              </div>
            </div>
            <div className='overflow-auto'>
              {students.data && students.data.length > 0 ? (
                <form onSubmit={onSubmit}>
                  <table className='w-full text-md text-left rtl:text-right dark:bg-gray-700 dark:text-gray-300'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400 border-b-2 border-gray-500'>
                      <tr className='text-nowrap bg-gray-500 text-white align-middle'>
                        <th className='px-3 py-2'>Name</th>
                        <th className='px-3 py-2'>Father Name</th>
                        <th className='px-3 py-2'>Total Hours</th>
                        <th className='px-3 py-2'>Absent Hours</th>
                        <th className='px-3 py-2'>Present Hours</th>
                        <th className='px-3 py-2'>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.data.map((student) => (
                        <tr key={student.id}>
                          <td className='px-3 py-2'>{student.name}</td>
                          <td className='px-3 py-2'>{student.father_name}</td>
                          <td className='px-3 py-2'>
                            <TextInput
                              className="form-control"
                              type="text"
                              name={`total_hours_${student.id}`}
                              value={data.attendances.find(a => a.student_id === student.id)?.total_hours || ''}
                              placeholder="Total hours"
                              onChange={(e) => handleArrayChange(e, student.id, 'total_hours')}
                            />
                          </td>
                          <InputError message={errors[`attendances.${student.id}.total_hours`]} className='mt-2'/>
                          <td className='px-3 py-2'>
                            <TextInput
                              className="form-control"
                              type="text"
                              name={`absent_hours_${student.id}`}
                              value={data.attendances.find(a => a.student_id === student.id)?.absent_hours || ''}
                              placeholder="Absent hours"
                              onChange={(e) => handleArrayChange(e, student.id, 'absent_hours')}
                            />
                          </td>
                          <InputError message={errors[`attendances.${student.id}.absent_hours`]} className='mt-2'/>
                          <td className='px-3 py-2'>
                            <TextInput
                              className="form-control"
                              type="number"
                              placeholder="present hours"
                              name={`present_hours_${student.id}`}
                              value={data.attendances.find(a => a.student_id === student.id)?.present_hours || ''}
                              readOnly
                            />
                          </td>
                          <td className='px-3 py-2'>
                            {student.attendence.map(attendance => (
                              <span key={attendance.id} className="text-lead">
                                {calculateCompletionStatus(attendance.absent_hours, attendance.total_hours)}
                              </span>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="text-end me-2">
                    <button className='bg-blue-500 py-1 px-3 mt-2 mb-2 text-gray-200 rounded-sm bg-gray-500 transition-all hover:bg-gray-600 mr-2'>
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );

}
