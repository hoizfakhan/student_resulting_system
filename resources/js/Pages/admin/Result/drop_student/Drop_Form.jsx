import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, Link, router } from "@inertiajs/react";
import DangerButton from "@/Components/DangerButton";
import Pagination from "@/Components/Pagination";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import ErrorModal from "@/Pages/ErrorModal";
import SuccessModal from "@/Pages/SuccessModal";
import { useEffect, useState } from "react";
import { faEdit, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextAreaInput from "@/Components/TextAreaInput";

export default function Drop_Form({ auth, success,studentId, semesterId, error }) {
  const [successMessage, setSuccessMessage] = useState(success || null);
  const [errorMessage, setErrorMessage] = useState(error || null);


  const { data, setData, post, processing, errors } = useForm({
    student_id: studentId,
    semester_id: semesterId,
    drop_reason: '',
    maktob_number: '',
});



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

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('dropStudent.submit'));
};



  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Drop Student
        </h2>
      }
    >
      <Head title="drop_student" />

      <div className="py-12">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
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
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <h1>Drop Student Form</h1>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="student_id" value={data.student_id} />
                <input type="hidden" name="semester_id" value={data.semester_id} />

                <div>
                    <label htmlFor="drop_reason">Drop Reason:</label>
                    <TextAreaInput
                        id="drop_reason"
                        name="drop_reason"
                        value={data.drop_reason}
                        onChange={(e) => setData('drop_reason', e.target.value)}
                    />
                    {errors.drop_reason && <div>{errors.drop_reason}</div>}
                </div>

                <div>
                    <label htmlFor="maktob_number">Maktob Number:</label>
                    <TextInput
                        type="text"
                        id="maktob_number"
                        name="maktob_number"
                        value={data.maktob_number}
                        onChange={(e) => setData('maktob_number', e.target.value)}
                    />
                    {errors.maktob_number && <div>{errors.maktob_number}</div>}
                </div>

                <button type="submit" disabled={processing}>Submit</button>
            </form>


          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
