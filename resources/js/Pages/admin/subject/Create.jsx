import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
export default function Create({ auth }) {
  const { data, setData, post, errors, reset } = useForm({
    name: "",
    faculty_id: "",
    department_id: "",
    semester: "",
    credit: "",
    subject_type: "",
    practical_credit: "",
    theoretical_credit: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(e);
    post(route("subject.store"));
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Add Subject
        </h2>
      }
    >
      <Head title="Add Subject" />

      <div className="py-12">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="mt-4 ms-5">
              <p className="lead text-gray-800"> Subject Registration Form</p>
            </div>

            <form
              action=""
              onSubmit={onSubmit}
              className="container mb-5 mt-2 ms-4 me-4 w-75 p-3 sm:p-8 bg-white dark:bg-gray-800"
            >
              <div className="row form-row">
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel htmlFor="name">
                      Name:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      className="form-control mt-1"
                      id="name"
                      type="text"
                      name="name"
                      onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Faculty:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      className="form-control mt-1"
                      id="faculty"
                      name="faculty_id"
                      type="text"
                      onChange={(e) => setData("faculty_id", e.target.value)}
                    />
                    <InputError message={errors.faculty_id} className="mt-2" />
                  </div>
                </div>
              </div>
              <div className="row form-row">
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Department:{" "}
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      id="department"
                      name="department_id"
                      type="text"
                      className="form-control mt-1"
                      onChange={(e) => setData("department_id", e.target.value)}
                    />
                    <InputError
                      message={errors.department_id}
                      className="mt-2"
                    />
                  </div>
                </div>
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Semester:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <select
                      id="semester"
                      name="semester"
                      className="form-control mt-1"
                      onChange={(e) => setData("semester", e.target.value)}
                    >
                      <option value="">Select a semester</option>
                      {[...Array(10)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                    <InputError message={errors.semester} className="mt-2" />
                  </div>
                </div>
              </div>
              <div class="row form-row">
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Credit:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      id="credit"
                      name="credit"
                      type="number"
                      className="form-control mt-1"
                      onChange={(e) => setData("credit", e.target.value)}
                    />
                    <InputError message={errors.credit} className="mt-2" />
                  </div>
                </div>

                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Subject Type:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      id="subject_type"
                      name="subject_type"
                      type="text"
                      className="form-control mt-1"
                      onChange={(e) => setData("subject_type", e.target.value)}
                    />
                    <InputError
                      message={errors.subject_type}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              <div className="row form-row">
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Practical Credit:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      id="practical_credit"
                      name="practical_credit"
                      type="number"
                      className="form-control mt-1"
                      onChange={(e) =>
                        setData("practical_credit", e.target.value)
                      }
                    />
                    <InputError
                      message={errors.practical_credit}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Theoretical Credit:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      id="theoretical_credit"
                      name="theoretical_credit"
                      type="number"
                      className="form-control mt-1"
                      onChange={(e) =>
                        setData("theoretical_credit", e.target.value)
                      }
                    />
                    <InputError
                      message={errors.theoretical_credit}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
              <div className="text-end mt-4">
                <Link
                  href={route("subject.index")}
                  className="bg-gray-300 py-1  px-3  text-gray-800  rounded transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
