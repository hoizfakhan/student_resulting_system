import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head,Link,useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
export default function Edit({ auth,teachers,departments,subjects,teacherSubject,error }) {

  //const [selectedSubjects, setSelectedSubjects] = useState([]);

  {/*  const handleCheckboxChange = (event) => {

    const selectedId = parseInt(event.target.value);

    // Check if the subject is already in the selectedSubjects array
    if (selectedSubjects.includes(selectedId)) {
        // Uncheck the subject by removing it from the selectedSubjects array
        setSelectedSubjects(selectedSubjects.filter(id => id !== selectedId));

        // If the subject being edited is the same as the subject toggled, uncheck it in the data state
        if (teacherSubject.data.subject_id === selectedId) {
            setData("subject_id", null);
        }
    } else {
        // Check the subject by adding it to the selectedSubjects array
        setSelectedSubjects([...selectedSubjects, selectedId]);
    }

  };

*/}

  const {data,setData,post,errors,reset}  =   useForm({

          teacher_id:teacherSubject.data.teacher_id || "",
          department_id:teacherSubject.data.department_id || "",
          semester:teacherSubject.data.semester || "",
          status:teacherSubject.data.status || "",
          subject_id:teacherSubject.data.subject_id || "",
          _method:'PUT',

      });

    //  useEffect(() => {
      //  setData({ ...data, subject_id: selectedSubjects });
     // }, [selectedSubjects]);


      const onSubmit = (e) =>{

       e.preventDefault();
       console.log(teacherSubject.data.subject_id);
        post(route('assignsubject.update',[
           teacherSubject.data.teacher_id || "",
           teacherSubject.data.faculty_id || "",
           teacherSubject.data.department_id || "",
           teacherSubject.data.semester || "",
           teacherSubject.data.subject_id || "",
        ]),{

          status: teacherSubject.data.status,
        });

       }



  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
       Edit Assgined Subject
        </h2>
      }
    >
      <Head title="Assgin New Subject" />

      <div className="py-12">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
        {error && (
              <div className='bg-red-500 py-2 px-4 text-white rounded mb-4'>
               {error}
               </div>
         )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="mt-4 ms-5">
              <p className="lead text-gray-600">Edit Assgined Subject Form</p>
            </div>

            <form
              onSubmit={onSubmit}
              className="container mb-5 mt-2 ms-4 me-4 w-75 p-3 sm:p-8 bg-white dark:bg-gray-800"
            >
              <div className="row form-row">
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel htmlFor="name">
                      Teacher:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <SelectInput
                      className="form-control mt-1"
                      id="teacher_id"
                      type="text"
                      name="teacher_id"
                      value={data && data.teacher_id}
                      isFocused={true}
                      onChange={(e) => setData("teacher_id",e.target.value)}
                    >

                    <option value="">Select Teacher</option>
                    {teachers.map((teacher) => (

                      <option value={teacher.id} key={teacher.id}>{teacher.name}</option>


                   ))}


                    </SelectInput>
                    <InputError message={errors.teacher_id} className='mt-2'/>
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                     Department:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <SelectInput
                      className="form-control mt-1"
                      id="department_id"
                      name="department_id"
                      value={data.department_id}
                     onChange={(e) => setData("department_id",e.target.value)}
                    >
                   <option>Select department</option>
                     {departments.map((department) => (

                      <option value={department.id} key={department.id}>{department.name}</option>


                     ))}


                    </SelectInput>
                      <InputError message={errors.department_id} className='mt-2'/>
                  </div>
                </div>
              </div>
              <div className="row form-row">
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Semester{" "}
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      className="form-control mt-1"
                      id="semester"
                      name="semester"
                      value={data.semester}
                      type="number"
                      onChange={(e) => setData("semester",e.target.value)}
                    />
                   <InputError message={errors.semester} className='mt-2'/>
                  </div>
                </div>

                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                     Subject:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <SelectInput
                      className="form-control mt-1"
                      id="subject_id"
                      name="subject_id"
                      value={data.subject_id}
                      onChange={(e) => setData("subject_id",e.target.value)}
                    >
                   <option>Select Subject</option>
                     {subjects.map((subject) => (

                      <option value={subject.id} key={subject.id}>{subject.name}</option>


                     ))}


                    </SelectInput>
                      <InputError message={errors.department_id} className='mt-2'/>
                  </div>
                </div>
        {/* <div className="form-group col-md-6 d-flex flex-wrap">
                  <div className="mt-3">
                    <InputLabel>
                      Subject{" "}
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                     <ul>
                     {subjects.map((subject) => (
                        <li key={subject.id} className="mr-2">
                          <input
                            type="checkbox"
                            value={subject.id}
                            checked={selectedSubjects.includes(subject.id) || teacherSubject.data.subject_id === subject.id}
                            onChange={handleCheckboxChange}

                          />
                          <span className="ms-2">{subject.name}</span>

                        </li>

                      ))}
                     </ul>
                  </div>
                </div>
                 */}

              </div>


              <div className="row form-row">
                <div className="form-group col-md-6">
                  <div className="mt-1">
                    <InputLabel>
                      Status{" "}
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <SelectInput
                      className="form-control mt-1"
                      id="status"
                      name="status"
                      value={data.status}
                      onChange={(e) => setData("status",e.target.value)}
                     >
                     <option value="active">Active</option>
                     <option value="inactive">Inactive</option>


                    </SelectInput>
                   <InputError message={errors.status} className='mt-2'/>
                  </div>
                </div>

              </div>


              <div class="text-center mt-4 bg-gray-200">
              <Link
               href={route("assginsubject.index")}
               className='bg-gray-300 py-1  px-3  text-gray-800  rounded transition-all hover:bg-gray-400 mr-2'
              >
                Cancel
              </Link>
              <button className="btn btn-success mb-1 mt-1 mt-1" type="submit">
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
