import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
export default function Create({auth,subject}) {


  const { data, setData, post, errors, reset } = useForm({

    name: subject.data.name || "",
    credit: subject.data.credit || "",
    subject_type:subject.data.subject_type || "",
    practical_credit:subject.data.practical_credit || "",
    therical_credit: subject.data.therical_credit || "",
    _method:'PUT',

  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("subject.update",subject.data.id));
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Edit Subject
        </h2>
      }
    >
      <Head title="Add Subject" />

      <div className="py-12">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="mt-4 ms-5">
              <p className="lead text-gray-800 "> Edit Subject</p>
            </div>

            <form
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
                      value={data.name}
                      isFocused={true}
                      onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                  </div>
                </div>

                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Subject Type:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <SelectInput
                      id="subject_type"
                      name="subject_type"
                      value={data.subject_type}
                      className="form-control mt-1"
                      onChange={(e) => setData("subject_type", e.target.value)}
                    >
                     <option value=""> Subject type</option>
                     <option value="core">Core Subject</option>
                     <option value="project">Project Subject</option>
                     <option value="basic">Basic Subject</option>
                     <option value="general">General Subject</option>

                    </SelectInput>
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
                      Credit:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      id="credit"
                      name="credit"
                      type="number"
                      value={data.credit}
                      className="form-control mt-1"
                      onChange={(e) => setData("credit", e.target.value)}
                    />
                    <InputError message={errors.credit} className="mt-2" />
                  </div>
                </div>
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                    Thoeritical Credit:

                    </InputLabel>
                    <TextInput
                      id="therical_credit"
                      name="therical_credit"
                      type="number"
                      value={data.therical_credit}
                      className="form-control mt-1"
                      onChange={(e) =>
                        setData("therical_credit", e.target.value)
                      }
                    />
                    <InputError
                      message={errors. therical_credit}
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

                    </InputLabel>
                    <TextInput
                      id="practical_credit"
                      name="practical_credit"
                      type="number"
                      value={data.practical_credit}
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


              </div>
              <div className='mt-4 text-right bg-gray-300 p-2'>
                             <Link
                               href={route("subject.index")}
                               className='bg-gray-300 py-1 px-3 mb-2 text-gray-700 rounded-sm bg-gray-400  transition-all hover:bg-gray-100 mr-2'
                              >
                               Cancel
                              </Link>
                              <button
                               className='bg-emerald-500 py-1 px-3 text-white rounded-sm  me-3 transition-all hover:bg-emerald-600'
                              >
                               Update
                            </button>
                  </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
