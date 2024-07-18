import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import teacher from "@/Pages/teacher/teacher";
import { Head,Link,useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
export default function Edit({auth,teachers,departments,subjects,semesters,teacherSubject,error }) {

   const [selectedDepartmentid,setSelectedDepartmentid] = useState('');
   const [selectedSemesterid,setSelectedSemesterid] = useState('');
   const [Semesters,setSemesters] = useState([]);
   const [Subjects,setSubjects] = useState([]);

  const {data,setData,post,errors,reset}  =   useForm({

          teacher_id:teacherSubject.data.teacher_id || "",
          department_id:teacherSubject.data.department_id || "",
          semester_id:teacherSubject.data.semester_id || "",
          status:teacherSubject.data.status || "",
          subject_id:teacherSubject.data.subject_id || "",
          _method:'PUT',

      });


{/*
      useEffect(() => {

        if(selectedDepartmentid){
         let filteredSem = semesters.data.filter(sem => {
            return sem.department_id == selectedDepartmentid
          })

          setSemesters(filteredSem);

        }

      },[selectedDepartmentid]);

      useEffect(() => {

        if(selectedDepartmentid,selectedSemesterid){

         let filteredsub= subjects.data.filter(sub => {
         return sub.department_id == selectedDepartmentid && sub.semester_id == selectedSemesterid;

        })

        setSubjects(filteredsub);
        setData({...data,department_id:selectedDepartmentid,semester_id:selectedSemesterid});

       }

     },[selectedDepartmentid,selectedSemesterid])

*/}

    //  useEffect(() => {
      //  setData({ ...data, subject_id: selectedSubjects });
     // }, [selectedSubjects]);


      const onSubmit = (e) =>{

       e.preventDefault();

        post(route('assginsubject.update',teacherSubject.data.id));


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
             {/*   <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                     Department:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <SelectInput
                      className="form-control mt-1"
                      id="department_id"
                      name="department_id"
                      value={selectedDepartmentid}
                      onChange={(e) => setSelectedDepartmentid(e.target.value)}
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
                    <SelectInput
                      className="form-control mt-1"
                      id="semester_id"
                      name="semester_id"
                      value={selectedSemesterid}
                      onChange={(e) => setSelectedSemesterid(e.target.value)}
                    >
                   <option>Select Semester</option>

                   {Semesters.length > 0 ? (

                   Semesters.map((semester) => (
                   <option value={semester.semester.id} key={semester.id}>{semester.semester.name}</option>

                  ))

                   ) : (

                  <option value="">Select a department fisrt</option>
                  )}

                    </SelectInput>
                   <InputError message={errors.semester_id} className='mt-2'/>
                  </div>
                </div>
*/}

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
                     {subjects.data.map((subject) => (

                      <option value={subject.subject.id} key={subject.id}>{subject.subject.name}</option>

                     ))}

                    </SelectInput>
                      <InputError message={errors.subject_id} className='mt-2'/>
                  </div>
                </div>
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


              <div className="text-center mt-4 bg-gray-200">
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
