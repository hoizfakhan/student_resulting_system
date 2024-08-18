import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SuccessModal from "@/Pages/SuccessModal";
import ErrorModal from "@/Pages/ErrorModal";
import { useEffect, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Inertia } from '@inertiajs/inertia'; // Correct import

export default function CreateChance1({
  auth,
  students,
  subjectid,
  subject,
  semester,
  semester_id,
  department_id,
  department,
  success,
  error,
  info,
  teacher_name,
}) {
   // State to manage success and error messages
   const [successMessage, setSuccessMessage] = useState(success || null);
   const [errorMessage, setErrorMessage] = useState(error || null);
   const [infoMessage, setinfoMessage] = useState(error || null);
  const [chance, setChance] = useState();
  const [saveEnabled, setSaveEnabled] = useState(false); // State to track if Save button should be enabled
  const [totalMarks, setTotalMarks] = useState({});
  const [status, setStatus] = useState({});

  // Initialize initial marks for each student
  const initialMarks = students.data.map(student => {
    const mark = student.marks && student.marks.length > 0 ? student.marks[0] : { home_work: '', class_activity: '', midterm: '', final: '' };
    return {
      student_id: student.id,
      homework: mark.home_work || '',
      class_activity: mark.class_activity || '',
      midterm: mark.midterm || '',
      final: mark.final || '',
      total_marks: (mark.home_work || 0) + (mark.class_activity || 0) + (mark.midterm || 0) + (mark.final || 0)
    };
  });

  const { data, setData, post, errors } = useForm({
    subject_id: subjectid || "",
    marks: initialMarks, // Use initialMarks here
  });

  // Function to calculate status based on total marks
  const calculateStatus = (home_work, class_activity, midterm, final) => {
    const total_marks = ((home_work || 0) + (class_activity || 0) + (midterm || 0) + (final || 0));
    return total_marks >= 55 ? 'Passed' : 'Failed';
  };

  // Function to fetch failed students for the current chance
  const fetchFailedStudents = () => {
    try {
      Inertia.get(route(`FailedStudentChance${chance}.marks`, { subjectid, semester_id, department_id, chance }));
    } catch (error) {
      console.error("Error fetching failed students:", error);
    }
  };

  // Handle change in marks for a specific field
  const handleArrayChange = (e, studentId, field) => {
    const { value } = e.target;

    // Update the respective field for the student
    const updatedMarks = data.marks.map((mark) =>
      mark.student_id === studentId ? { ...mark, [field]: value } : mark
    );

    // Update the state with the updated marks
    setData({ ...data, marks: updatedMarks });

    // Calculate total_marks for the student whose field was updated
    calculateTotalMarks(studentId, updatedMarks);

    // Check if all marks are entered to update Save button state
    checkAllMarksEntered(updatedMarks);
  };

  // Calculate total marks for a student and update state
  const calculateTotalMarks = (studentId, updatedMarks) => {
    const studentMarks = updatedMarks.find((mark) => mark.student_id === studentId);
    const { homework, class_activity, midterm, final } = studentMarks;
    const total = parseInt(homework || 0) + parseInt(class_activity || 0) + parseInt(midterm || 0) + parseInt(final || 0);
    const totalMarks = isNaN(total) ? 0 : total;

    // Update total_marks state for the student
    setTotalMarks((prevTotalMarks) => ({
      ...prevTotalMarks,
      [studentId]: totalMarks,
    }));

    // Determine status (passed or failed) based on totalMarks
    const studentStatus = totalMarks >= 55 ? "Passed" : "Failed";
    setStatus((prevStatus) => ({
      ...prevStatus,
      [studentId]: studentStatus,
    }));
  };

  // Check if all marks are entered
  const checkAllMarksEntered = (updatedMarks) => {
    const allEntered = updatedMarks.every(mark =>
      mark.homework !== '' &&
      mark.class_activity !== '' &&
      mark.midterm !== '' &&
      mark.final !== ''
    );
    setSaveEnabled(allEntered);
  };

  // Handle saving marks for all students
  const handleSaveAllMarks = () => {
    const marksData = data.marks.map((mark) => ({
      student_id: mark.student_id,
      subject_id: data.subject_id,
      homework: parseInt(mark.homework || 0),
      class_activity: parseInt(mark.class_activity || 0),
      midterm: parseInt(mark.midterm || 0),
      final: parseInt(mark.final || 0),
    }));
    post(route("marks.storechance1All", [data.subject_id]), {
      marks: marksData,
    });
  };

  // Handle form submission (if additional logic is needed)
  const onSubmit = (e) => {
    e.preventDefault();
    // Additional submission logic if needed
  };

  // Effect to fetch failed students when component mounts or chance changes
  useEffect(() => {
    if (chance === 2 || chance === 3 || chance === 4) {
      fetchFailedStudents();
    }
  }, [chance]); // Trigger fetch when chance changes

  // Effect to update success message
  useEffect(() => {
    if (success) {
      setSuccessMessage(success);
    }
  }, [success]);

  // Effect to update error message
  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  // Effect to update info message
  useEffect(() => {
    if (info) {
      setinfoMessage(info);
    }
  }, [info]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Student Marks
        </h2>
      }
    >
      <Head title="Student Marks" />
      <div className="py-12">
        {/* Display success and error messages */}
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
        {infoMessage && (
          <ErrorModal
            message={infoMessage}
            onClose={() => setinfoMessage(null)}
          />
        )}

        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="container mt-2 mb-3 ms-2">
              <div className="row">
                {/* Display subject, department, and semester information */}
                <div className="col-md-3">
                  <span className="text-gray-800">Subject</span>:{" "}
                  <span className="mt-3 text-gray-500">{subject}</span>
                </div>
                <div className="col-md-3 ms-2">
                  Department:{" "}
                  <span className="mt-3 text-gray-500">{department}</span>
                </div>
                <div className="col-md-3 ms-2">
                  Semester:{" "}
                  <span className="mt-3 text-gray-500">{semester}</span>
                </div>
                <div className="col-md-3 ms-1">
                  Chance:<span className="mt-3 text-gray-500">First</span>
                </div>


                {/* Conditionally render the Chance 2 button */}

                  <div className="col-md-3 ms-1 mt-2">
                    <button
                      className="btn btn-sm btn-outline-primary ms-2"
                      onClick={() => setChance(2)}
                    >
                      Chance 2
                    </button>
                  </div>


              </div>
            </div>
            <div className="overflow-auto">
              {/* Render students' marks in a table */}
              {students.data && students.data.length > 0 ? (
                <form onSubmit={onSubmit}>
                  <table className="w-full text-md text-left rtl:text-right dark:bg-gray-700 dark:text-gray-300">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400 border-b-2 border-gray-500">
                      <tr className="text-nowrap bg-gray-500 text-white align-middle">
                      <th className="px-3 py-2">ID</th>
                        <th className="px-3 py-2">Name</th>
                        <th className="px-3 py-2">Father Name</th>
                        <th className="px-3 py-2">Home Work (10%)</th>
                        <th className="px-3 py-2">
                          Attendance & Class Activity (10%)
                        </th>
                        <th className="px-3 py-2">Midterm Marks (20%)</th>
                        <th className="px-3 py-2">Final Marks (60%)</th>
                        <th className="px-3 py-2">Total Marks (100%)</th>
                        <th className="px-3 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.data.map((student,index) => (
                        <tr key={student.id}>
                           <td className='px-3 py-2'>{index + 1}</td>
                          <td className="px-3 py-2">{student.name}</td>
                          <td className="px-3 py-2">{student.father_name}</td>

                          <td className="px-3 py-2">
                            <TextInput
                              className="form-control"
                              type="number"
                              min="0"
                              max="100"
                              name={`homework_${student.id}`}
                              value={data.marks.find(
                                (m) => m.student_id === student.id
                              )?.homework || ""}
                              onChange={(e) =>
                                handleArrayChange(e, student.id, "homework")
                              }
                            />
                          </td>
                          <InputError message={errors[`marks.${student.id}.homework`]} className='mt-2'/>
                          <td className="px-3 py-2">
                            <TextInput
                              className="form-control"
                              type="number"
                              min="0"
                              max="0"
                              name={`class_activity_${student.id}`}
                              value={data.marks.find(
                                (m) => m.student_id === student.id
                              )?.class_activity || ""}
                              onChange={(e) =>
                                handleArrayChange(e, student.id, "class_activity")
                              }
                            />
                          </td>
                          <InputError message={errors[`marks.${student.id}.class_activity`]} className='mt-2'/>
                          <td className="px-3 py-2">
                            <TextInput
                              className="form-control"
                              type="number"
                              min="0"
                              max="100"
                              name={`midterm_${student.id}`}
                              value={data.marks.find(
                                (m) => m.student_id === student.id
                              )?.midterm || ""}
                              onChange={(e) =>
                                handleArrayChange(e, student.id, "midterm")
                              }
                            />
                          </td>
                          <InputError message={errors[`marks.${student.id}.midterm`]} className='mt-2'/>
                          <td className="px-3 py-2">
                            <TextInput
                              className="form-control"
                              type="number"
                              min="0"
                              max="100"
                              name={`final_${student.id}`}
                              value={data.marks.find(
                                (m) => m.student_id === student.id
                              )?.final || ""}
                              onChange={(e) =>
                                handleArrayChange(e, student.id, "final")
                              }
                            />
                          </td>
                          <InputError message={errors[`marks.${student.id}.final`]} className='mt-2'/>
                          <td className="px-3 py-2">
                            <TextInput
                              className="form-control"
                              type="number"
                              placeholder="total marks"
                              name={`total_marks_${student.id}`}
                              value={data.marks.find(a => a.student_id === student.id)?.total_marks || ''}
                              readOnly
                            />
                          </td>
                          <td className="px-3 py-2">
                            {data.marks.find(mark => mark.student_id === student.id)?.total_marks ? (
                              <span className="text-lead">
                                {calculateStatus(
                                  data.marks.find(mark => mark.student_id === student.id).homework,
                                  data.marks.find(mark => mark.student_id === student.id).class_activity,
                                  data.marks.find(mark => mark.student_id === student.id).midterm,
                                  data.marks.find(mark => mark.student_id === student.id).final
                                )}
                              </span>
                            ) : (
                              'Not Calculated'
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Button to save marks for all students */}
                  <div className="text-end mt-3">
                    <button
                      className="btn btn-sm text-center m-3 btn-success"
                      onClick={handleSaveAllMarks}
                      disabled={!saveEnabled} // Disable the button if not all marks are entered
                    >
                      Save Marks
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center text-gray-500 font-lg">No students found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
