import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SuccessModal from "@/Pages/SuccessModal";
import ErrorModal from "@/Pages/ErrorModal";
import { useEffect, useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";

export default function CreateChance2({
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

  const handleBackClick =() => {

    window.history.back();
  }

  const [chance, setChance] = useState();

  const calculateStatus = (home_work, class_activity,midterm,final) => {

    const total_marks = ((home_work+class_activity+midterm+final));
    return total_marks >=55 ? 'Passed' : 'Failed';
  };
  // Initialize initial marks for each student

  const initialMarks = students.data.map(student => {
    const mark = student.marks && student.marks.length > 0 ? student.marks[0] : {home_work: '', class_activity: '',midterm:'',final:'' };
    return {
      student_id: student.id,
     // chance: mark.chance || '',
      homework: mark.home_work || '',
      class_activity: mark.class_activity || '',
      midterm: mark.midterm || '',
      final: mark.final || '',
      total_marks: (mark.home_work || 0) + (mark.class_activity || 0)+(mark.midterm || 0)+(mark.final || 0)
    };
  });

  // Initialize form state using Inertia useForm hook with initialMarks
  const { data, setData, post, errors } = useForm({
    subject_id: subjectid || "",
    marks: initialMarks, // Use initialMarks here
  });

   // Function to fetch failed students for the first chance
   const fetchFailedStudents = () => {
    try {

      Inertia.get(route('FailedStudentChance3.marks', { subjectid,semester_id,department_id, chance}));


    } catch (error) {
      console.error("Error fetching failed students:", error);
    }
  };

  // State to manage success and error messages
  const [successMessage, setSuccessMessage] = useState(success || null);
  const [errorMessage, setErrorMessage] = useState(error || null);
  const [infoMessage, setinfoMessage] = useState(error || null);

  // State to manage total marks for each student
  const [totalMarks, setTotalMarks] = useState({});
  // State to manage status (passed or failed) for each student
  const [status, setStatus] = useState({});


   // Effect to fetch failed students when component mounts
   useEffect(() => {
    if (chance === 2) {
      fetchFailedStudents();
      console.log("2");
    }

    if (chance === 3) {
      fetchFailedStudents();
      console.log("3");
    }

    if (chance === 4) {
      fetchFailedStudents();
      console.log("4");
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

  useEffect(() => {
    if (info) {
      setinfoMessage(error);
    }
  }, [info]);

  // Handle change in marks for a specific field (homework, class_activity, midterm, final)
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

  const handleSaveMarks = (studentId) => {
    const studentMarks = data.marks.find((mark) => mark.student_id === studentId);

    // Prepare data for the specific student
    const marksData = {
      student_id: studentMarks.student_id,
      subject_id: data.subject_id,
      homework: parseInt(studentMarks.homework || 0),
      class_activity: parseInt(studentMarks.class_activity || 0),
      midterm: parseInt(studentMarks.midterm || 0),
      final: parseInt(studentMarks.final || 0),
    };

    // Use Inertia's post method to save data
    post(route("marks.store1", [data.subject_id]), marksData);
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
    post(route("marks.storechance2All", [data.subject_id]), {
      marks: marksData,
    });
  };

  // Handle form submission (if additional logic is needed)
  const onSubmit = (e) => {
    e.preventDefault();
    // Additional submission logic if needed
  };

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
                Chance:Second

                </div>
                <div className="col-md-3 ms-1">
                Year:{" "}
                <span className="mt-3 text-gray-500"></span>
                </div>

                <div className="col-md-3 ms-1 mt-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setChance(3)}
                   >
                 Chance 3
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
                        <th className="px-3 py-2">Name</th>
                        <th className="px-3 py-2">Father Name</th>
                        <th className="px-3 py-2">Home Work (10%)</th>
                        <th className="px-3 py-2">
                          Attendance && Class Activity (10%)
                        </th>
                        <th className="px-3 py-2">Midterm Marks (20%)</th>
                        <th className="px-3 py-2">Final Marks (60%)</th>
                        <th className="px-3 py-2">Total Marks (100%)</th>
                        <th className="px-3 py-2">Status</th>

                      </tr>
                    </thead>
                    <tbody>
                      {students.data.map((student) => (
                        <tr key={student.id}>
                          <td className="px-3 py-2">{student.name}</td>
                          <td className="px-3 py-2">{student.father_name}</td>

                          <td className="px-3 py-2">
                            {/* Text input for homework marks */}
                            <TextInput
                              className="form-control"
                              type="number"
                              min="0"
                              name={`homework_${student.id}`}
                              value={data.marks.find(
                                (m) => m.student_id === student.id
                              )?.homework || ""}
                              onChange={(e) =>
                                handleArrayChange(e, student.id, "homework")
                              }
                            />
                          </td>
                          <td className="px-3 py-2">
                            {/* Text input for class activity marks */}
                            <TextInput
                              className="form-control"
                              type="number"
                              min="0"
                              name={`class_activity_${student.id}`}
                              value={data.marks.find(
                                (m) => m.student_id === student.id
                              )?.class_activity || ""}
                              onChange={(e) =>
                                handleArrayChange(e, student.id, "class_activity")
                              }
                            />
                          </td>
                          <td className="px-3 py-2">
                            {/* Text input for midterm marks */}
                            <TextInput
                              className="form-control"
                              type="number"
                              min="0"
                              name={`midterm_${student.id}`}
                              value={data.marks.find(
                                (m) => m.student_id === student.id
                              )?.midterm || ""}
                              onChange={(e) =>
                                handleArrayChange(e, student.id, "midterm")
                              }
                            />
                          </td>
                          <td className="px-3 py-2">
                            {/* Text input for final marks */}
                            <TextInput
                              className="form-control"
                              type="number"
                              min="0"
                              name={`final_${student.id}`}
                              value={data.marks.find(
                                (m) => m.student_id === student.id
                              )?.final || ""}
                              onChange={(e) =>
                                handleArrayChange(e, student.id, "final")
                              }
                            />
                          </td>
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
                          {student.marks.map(mark => (
                              <span key={mark.id} className="text-lead">
                                {calculateStatus(mark.home_work, mark.class_activity,mark.midterm,mark.final)}
                              </span>
                            ))}
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Button to save marks for all students */}
                  <div className="text-end mt-3">
                  <button
                   onClick={handleBackClick}
                   className="btn btn-sm text-center btn-success"
                    >
                   Go Back
                 </button>
                  <button
                    className="btn btn-sm text-center m-3 btn-success"
                    onClick={handleSaveAllMarks}
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
